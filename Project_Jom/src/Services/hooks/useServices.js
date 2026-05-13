import { useEffect, useState } from "react";

const API_URL =
    "https://9pidtz8z27.execute-api.us-east-1.amazonaws.com/services";

export default function useServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch(API_URL);

                const data = await res.json();

                setServices(data || []);
            } catch (error) {
                console.error("Failed to fetch services", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return {
        services,
        loading,
    };
}