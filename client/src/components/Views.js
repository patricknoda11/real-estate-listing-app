import Header from "./Header";
import Button from "./Button";
import ListingSearchFields from "./ListingSearchFields";

const views = (title) => {
  return (
    <>
      <Header />
      <ListingSearchFields />
      <Button color={"green"} text={"search"} />
    </>
  );
};

export default views;
