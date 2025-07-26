"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
export default function CategoriesPage() {
    const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/admin/check-auth");

      if (res.status !== 200) {
        router.push("/admin/login");
      }
    };

    checkAuth();
  }, [router]);



  const fetchCategories = async () => {
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    setCategories(data.categories);
  };

  useEffect(() => { fetchCategories(); }, []);

  const addCategory = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/admin/categories", {
      method: "POST",
      body: JSON.stringify({ name: newCategory }),
    });
    if (res.ok) {
      setNewCategory("");
      fetchCategories();
    }
  };

  return (
    <div>
      <form onSubmit={addCategory} className="mb-4">
        <input
          type="text"
          required
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category"
          className="p-2 border rounded w-full"
        />
        <button className="mt-2 bg-black text-white px-4 py-2 rounded">Add</button>
      </form>

      <h2 className="text-xl font-semibold">Categories:</h2>
      <ul>
        {categories.map((c, i) => (
          <li key={i} className="border p-2 rounded mb-2">{c.name}</li>
        ))}
      </ul>
    </div>
  );
}