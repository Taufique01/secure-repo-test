import {
  DependencyList,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Status } from "./status";

export const useFetch = <ResponseType, RequestType = unknown>(
  fetchArgGenerator: () => {
    input?: RequestInfo;
    init?: RequestInit;
  },
  deps?: DependencyList,
  options: OptionsType = {}
) => {
  const [response, setResponse] = useState<ResponseType | undefined>(undefined);
  const [status, setStatus] = useState(Status.NotStarted);

  const mounted = useRef(true);

  const { preCondition, acceptedStatus, autoTrigger, parseJson } = {
    ...defaultOption,
    ...options,
  };

  const { input, init } = useMemo(fetchArgGenerator, deps); // eslint-disable-line react-hooks/exhaustive-deps
  const shouldFetch = preCondition();

  useEffect(() => {
    return function cleanup() {
      mounted.current = false;
    };
  }, []);

  const trigger = useCallback<
    (triggerInput?: { body?: RequestType; input?: RequestInfo }) => void
  >(
    ({ body, input: inputFromTrigger } = {}) => {
      async function fetchAsync() {
        setStatus(Status.Pending);
        const bodyStringObj = body && { body: JSON.stringify(body) };
        const httpResponse = await fetch(inputFromTrigger || input || "", {
          ...init,
          ...bodyStringObj,
        });
        if (
          acceptedStatus !== "any" &&
          acceptedStatus !== httpResponse.status
        ) {
          mounted.current && setStatus(Status.Error);
          return;
        }
        if (parseJson) {
          const parsedJsonResponse = await httpResponse.json();
          mounted.current && setResponse(parsedJsonResponse);
        }
        mounted.current && setStatus(Status.Success);
      }

      shouldFetch && fetchAsync();
    },
    [acceptedStatus, init, input, parseJson, shouldFetch]
  );

  useEffect(() => {
    autoTrigger && trigger();
  }, [trigger, autoTrigger]);

  return { status, response, trigger };
};

export type OptionsType = {
  preCondition?: () => boolean;
  acceptedStatus?: number | "any";
  autoTrigger?: boolean;
  parseJson?: boolean;
};

const defaultOption = {
  preCondition: () => true,
  acceptedStatus: "any",
  autoTrigger: true,
  parseJson: true,
};
