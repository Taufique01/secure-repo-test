import { Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useGetClient } from "../client/getClient";
import { ListItemLink } from "./Landing";

export function Categories() {
  const { data: categories } = useGetClient("/api/categories/");

  return (
    <Grid container item xs={12} md={3} spacing={0}>
      <Box component="div" className="category-menu">
        <Typography component="h3">Categories</Typography>
        {categories?.map((category) => (
          <List component="nav" key={category.slug}>
            <ListItemLink
              component={RouterLink}
              to={`/products/all?category=${category.slug}/`}
            >
              <ListItemText primary={category.name} />
            </ListItemLink>
          </List>
        ))}
      </Box>
    </Grid>
  );
}
