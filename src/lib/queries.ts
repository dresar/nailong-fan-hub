import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "./api";

export const useCharacters = () => useQuery({
  queryKey: ["characters"],
  queryFn: () => apiFetch<any[]>("/characters"),
});

export const useEpisodes = () => useQuery({
  queryKey: ["episodes"],
  queryFn: () => apiFetch<any[]>("/episodes"),
});

export const useMemes = () => useQuery({
  queryKey: ["memes"],
  queryFn: () => apiFetch<any[]>("/memes"),
});

export const useNews = () => useQuery({
  queryKey: ["news"],
  queryFn: () => apiFetch<any[]>("/news"),
});

export const useNewsBySlug = (slug: string) => useQuery({
  queryKey: ["news", slug],
  queryFn: () => apiFetch<any>(`/news/${slug}`),
  enabled: !!slug,
});

export const useProducts = () => useQuery({
  queryKey: ["products"],
  queryFn: () => apiFetch<any[]>("/products"),
});

export const usePosts = () => useQuery({
  queryKey: ["posts"],
  queryFn: () => apiFetch<any[]>("/posts"),
});

export const useLeaderboard = () => useQuery({
  queryKey: ["leaderboard"],
  queryFn: () => apiFetch<any[]>("/leaderboard"),
});

export const useEvents = () => useQuery({
  queryKey: ["events"],
  queryFn: () => apiFetch<any[]>("/events"),
});

export const useFaqs = () => useQuery({
  queryKey: ["faqs"],
  queryFn: () => apiFetch<any[]>("/faqs"),
});

export const useGallery = () => useQuery({
  queryKey: ["gallery"],
  queryFn: () => apiFetch<any[]>("/gallery"),
});

export const useCollection = () => useQuery({
  queryKey: ["collection"],
  queryFn: () => apiFetch<any[]>("/collection"),
});

// --- ADMIN QUERIES ---

export const useAdminEpisodes = () => useQuery({
  queryKey: ["admin", "episodes"],
  queryFn: () => apiFetch<any[]>("/admin/episodes"),
});

export const useAdminMemes = () => useQuery({
  queryKey: ["admin", "memes"],
  queryFn: () => apiFetch<any[]>("/admin/memes"),
});

export const useAdminGallery = () => useQuery({
  queryKey: ["admin", "gallery"],
  queryFn: () => apiFetch<any[]>("/admin/gallery"),
});

export const useAdminNews = () => useQuery({
  queryKey: ["admin", "news"],
  queryFn: () => apiFetch<any[]>("/admin/news"),
});

export const useAdminProducts = () => useQuery({
  queryKey: ["admin", "products"],
  queryFn: () => apiFetch<any[]>("/admin/products"),
});

export const useAdminEvents = () => useQuery({
  queryKey: ["admin", "events"],
  queryFn: () => apiFetch<any[]>("/admin/events"),
});

export const useAdminCategories = () => useQuery({
  queryKey: ["admin", "categories"],
  queryFn: () => apiFetch<any[]>("/admin/categories"),
});

// --- ADMIN MUTATIONS (Helper example) ---
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAdminReports = () => useQuery({
  queryKey: ["admin", "reports"],
  queryFn: () => apiFetch<any[]>("/admin/reports"),
});

export const useDeleteAdminItem = (path: string, key: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiFetch(`/admin/${path}/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", key] });
    },
  });
};

export const useCreateAdminItem = (path: string, key: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => apiFetch(`/admin/${path}`, { method: "POST", body: JSON.stringify(data) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", key] });
    },
  });
};

export const useUpdateAdminItem = (path: string, key: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      apiFetch(`/admin/${path}/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", key] });
    },
  });
};
