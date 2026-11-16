import NotFoundView from "@/components/not-found-view";

export default function NotFound() {
  return (
    <NotFoundView
      title="পেজটি পাওয়া যায়নি"
      message="দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটির ঠিকানা ভুল অথবা পেজটি সরিয়ে ফেলা হয়েছে।"
      emoji="🍉"
    />
  );
}
