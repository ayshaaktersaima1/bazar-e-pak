import CategoryPageContent from "@/components/category/CategoryPageContent";
import { getData } from "@/lib/api";

const CategoryPage = async ({ params }) => {
    const { category } = await params;

    const categories = await getData("/api/categories");

    const categoryInfo = categories.find(
        (item) => item.slug === category
    );

    return (
        <CategoryPageContent
            category={category}
            categoryInfo={categoryInfo}
        />
    );
};

export default CategoryPage;