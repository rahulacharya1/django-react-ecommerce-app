export default function Header() {
  return (
    <div className="bg-black text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">MyStore</h1>
      <a href="/admin" className="hover:text-gray-300">Admin</a>
    </div>
  );
}