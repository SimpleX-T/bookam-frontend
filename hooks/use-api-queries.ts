import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiClient,
  CreateBusRequest,
  CreateRouteRequest,
  LoginRequest,
  RegisterRequest,
  RouteSearchParams,
  UpdateBusRequest,
  UpdateRouteRequest,
} from "@/lib/api-client";
import { useAuth } from "./use-auth";

/**
 * Custom hooks for API queries using TanStack React Query
 */

// Auth queries
export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => apiClient.account.login(data),
    onSuccess: () => {
      // Invalidate relevant queries when login is successful
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => apiClient.account.register(data),
  });
};

// Bus queries
export const useBuses = () => {
  const { token, isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["buses"],
    queryFn: () => apiClient.bus.getAll(token as string),
    enabled: !!token && isAuthenticated,
    select: (data) => data.data,
  });
};

export const useBusById = (id: string) => {
  const { token, isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["bus", id],
    queryFn: () => apiClient.bus.getById(id, token as string),
    enabled: !!token && isAuthenticated && !!id,
    select: (data) => data.data,
  });
};

export const useCreateBusMutation = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBusRequest) =>
      apiClient.bus.create(data, token as string),
    onSuccess: () => {
      // Invalidate buses query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: ["buses"] });
    },
  });
};

export const useUpdateBusMutation = (id: string) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateBusRequest) =>
      apiClient.bus.update(id, data, token as string),
    onSuccess: () => {
      // Invalidate specific bus and buses list
      queryClient.invalidateQueries({ queryKey: ["bus", id] });
      queryClient.invalidateQueries({ queryKey: ["buses"] });
    },
  });
};

export const useDeleteBusMutation = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.bus.delete(id, token as string),
    onSuccess: (_, id) => {
      // Invalidate specific bus and buses list
      queryClient.invalidateQueries({ queryKey: ["bus", id] });
      queryClient.invalidateQueries({ queryKey: ["buses"] });
    },
  });
};

// Route queries
export const useRoutes = () => {
  const { token, isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["routes"],
    queryFn: () => apiClient.route.getAll(token as string),
    enabled: !!token && isAuthenticated,
    select: (data) => data.data,
  });
};

export const useRouteById = (id: string) => {
  const { token, isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["route", id],
    queryFn: () => apiClient.route.getById(id, token as string),
    enabled: !!token && isAuthenticated && !!id,
    select: (data) => data.data,
  });
};

export const useSearchRoutes = (params: RouteSearchParams) => {
  const { token, isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["routes", "search", params],
    queryFn: () => apiClient.route.search(params, token as string),
    enabled:
      !!token && isAuthenticated && !!(params.origin || params.destination),
    select: (data) => data.data,
  });
};

export const useCreateRouteMutation = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRouteRequest) =>
      apiClient.route.create(data, token as string),
    onSuccess: () => {
      // Invalidate routes query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: ["routes"] });
    },
  });
};

export const useUpdateRouteMutation = (id: string) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateRouteRequest) =>
      apiClient.route.update(id, data, token as string),
    onSuccess: () => {
      // Invalidate specific route and routes list
      queryClient.invalidateQueries({ queryKey: ["route", id] });
      queryClient.invalidateQueries({ queryKey: ["routes"] });
    },
  });
};

export const useDeleteRouteMutation = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.route.delete(id, token as string),
    onSuccess: (_, id) => {
      // Invalidate specific route and routes list
      queryClient.invalidateQueries({ queryKey: ["route", id] });
      queryClient.invalidateQueries({ queryKey: ["routes"] });
    },
  });
};

// User queries
export const useUsers = () => {
  const { token, isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["users"],
    queryFn: () => apiClient.user.fetchAll(token as string),
    enabled: !!token && isAuthenticated,
    select: (data) => data.data,
  });
};

export const useDeleteUserMutation = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiClient.user.delete(token as string),
    onSuccess: () => {
      // Clear all queries from cache when user is deleted
      queryClient.clear();
    },
  });
};
