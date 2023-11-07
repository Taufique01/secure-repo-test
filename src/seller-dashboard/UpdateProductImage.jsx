import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { Dialog, IconButton, ImageList, ImageListItem } from "@mui/material";
import { Status } from "../client/status";
import { ImageUpload } from "./ImagePicker";
import { Delete } from "@mui/icons-material";
import { useUploadImageClient } from "./uoloadImageClient";
import { useDeleteClient } from "./useDeleteClient";

export function UpdateProductImage({ product, onClose, open, onUpdate }) {
  const { status, uploadProductImage } = useUploadImageClient(
    `/api/product/${product.id}/add-image/`
  );

  const { status: deleteStatus, trigger: deleteImage } = useDeleteClient();
  useEffect(() => {
    status == Status.Success && onUpdate();
  }, [onUpdate, status]);

  useEffect(() => {
    deleteStatus == 200 && onUpdate();
  }, [onUpdate, deleteStatus]);

  return (
    <Dialog onClose={onClose} open={open}>
      <ImageList
        sx={{ width: 500, height: 450 }}
        cols={2}
        rowHeight={200}
        gap={1}token
      >
        {product.images.map((image, index) => {
          return (
            <ImageListItem sx={{ position: "relative" }} key={index}>
              <img src={image.image} alt="Product" loading="lazy" />
              <IconButton
                size="large"
                sx={{ position: "absolute", right: 0, color: "red" }}
                onClick={() =>
                  deleteImage({ input: `/api/image/${image.id}/` })
                }
              >
                <Delete
                  fontSize="large"
                  sx={{ border: "1px solid white", borderRadius: "50%" }}
                />
              </IconButton>
            </ImageListItem>
          );
        })}
      </ImageList>

      {status === Status.Pending && <Typography>Uploading...</Typography>}

      <ImageUpload
        onImagesChange={(imageList) =>
          imageList[0].file && uploadProductImage(imageList[0].file)
        }
      />
    </Dialog>
  );
}


