import { db } from "./src/db";
import { categories } from "./src/db/schema";

async function seedCategories() {
  console.log("Seeding basic categories...");
  const basicCategories = [
    { id: "prod-acc", name: "Aksesoris", type: "product", icon: "Tag" },
    { id: "prod-doll", name: "Boneka", type: "product", icon: "Tag" },
    { id: "gal-off", name: "Official", type: "gallery", icon: "Image" },
    { id: "gal-fan", name: "Fanart", type: "gallery", icon: "Image" },
    { id: "news-upd", name: "Update", type: "news", icon: "Newspaper" },
    { id: "news-ev", name: "Event", type: "news", icon: "Calendar" },
    { id: "ep-main", name: "Official", type: "episodes", icon: "Film" },
  ];

  for (const cat of basicCategories) {
    try {
      await db.insert(categories).values(cat).onConflictDoNothing();
      console.log(`- Seeded ${cat.name} (${cat.type})`);
    } catch (e) {
      console.error(`Error seeding ${cat.name}:`, e);
    }
  }
  console.log("Done!");
}

seedCategories();
