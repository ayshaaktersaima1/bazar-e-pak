import CategoryPageContent from "@/components/category/CategoryPageContent";
import CategoryViewTracker from "@/components/category/CategoryViewTracker";
import { getData } from "@/lib/api";

const CategoryPage = async ({ params }) => {
  const { category } = await params;

  const categories = await getData("/api/categories");

  const categoryInfo = categories.find((item) => item.slug === category);

  return (
    <>
      {categoryInfo?._id && (
        <CategoryViewTracker
          categoryId={categoryInfo._id}
          categorySlug={category}
        />
      )}

      <CategoryPageContent category={category} categoryInfo={categoryInfo} />
    </>
  );
};

export default CategoryPage;
