import NotFoundView from "@/components/not-found-view";
import CategoryView from "./category-view";
import { getCategories } from "@/lib/api";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  // invalid slug → friendly 404-style empty state with CTA
  if (!category) {
    return (
      <NotFoundView
        title="ক্যাটাগরিটি পাওয়া যায়নি"
        message={`"${slug}" নামের কোনো ক্যাটাগরি নেই। সঠিক ক্যাটাগরি থেকে আবার চেষ্টা করুন।`}
        emoji="🥕"
      />
    );
  }

  return <CategoryView category={category} />;
}
