import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionApi } from "../api/sessions";



const useActiveSessions = () => {
    const result = useQuery({
        queryKey: ["activeSessions"],
        queryFn: sessionApi.getActiveSessions,
    });

    return result;
};

const useMyRecentSessions = () => {
    const result = useQuery({
        queryKey: ["myRecentSessions"],
        queryFn: sessionApi.getMyRecentSessions,
    });

    return result;
};

const useSessionById = (id) => {
    const result = useQuery({
        queryKey: ["session", id],
        queryFn: () => sessionApi.getSessionById(id),
        enabled: !!id,
        refetchInterval: 5000, // refetch every 5 seconds to detect session status changes
    });

    return result;
};

const useJoinSession = () => {
    const result = useMutation({
        mutationKey: ["joinSession"],
        mutationFn: sessionApi.joinSession,
        onSuccess: () => toast.success("Joined session successfully!"),
        onError: (error) => toast.error(error.response?.data?.message || "Failed to join session"),
    });

    return result;
};

const useEndSession = () => {
    const result = useMutation({
        mutationKey: ["endSession"],
        mutationFn: sessionApi.endSession,
        onSuccess: () => toast.success("Session ended successfully!"),
        onError: (error) => toast.error(error.response?.data?.message || "Failed to end session"),
    });

    return result;
};

const useCreateSession = () => {
    const result = useMutation({
        mutationKey: ["createSession"],
        mutationFn: sessionApi.createSession,
        onSuccess: () => toast.success("Session created successfully!"),
        onError: (error) => toast.error(error.response?.data?.message || "Failed to create room"),
    });

    return result;
};


export {
    useActiveSessions,
    useCreateSession,
    useEndSession,
    useJoinSession,
    useMyRecentSessions,
    useSessionById
}