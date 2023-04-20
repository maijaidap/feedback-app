import MainLayout from "../components/main-layout/MainLayout";
import Grid2 from "@mui/material/Unstable_Grid2";
import { List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ItemListItem from "../components/feedback-list-item/ItemListItem";
import { getItems } from "../api/api";

interface Item {
  id: string;
  name: string;
  avgGrade: string;
  reviewsDone: string;
}

const Home = (): JSX.Element => {
  const [items, setitems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getItems();
      setitems(result);
    };
    fetchData();
  }, []);

  return (
    <MainLayout>
      <Grid2
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
        marginTop={5}
      >
        <Grid2 xs={12} margin={2}>
          <Typography variant="h4" display="flex" justifyContent="center">
            Items
          </Typography>
        </Grid2>
        <List className="full-width">
          {items.map((item) => (
            <Grid2 key={item.id} xs={4}>
              <ItemListItem item={item} />
            </Grid2>
          ))}
        </List>
      </Grid2>
    </MainLayout>
  );
};

export default Home;
