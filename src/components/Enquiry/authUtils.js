// src/utils/authUtils.js

export async function refreshToken() {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) {
        console.error("No refresh token available");
        return null;
    }

    try {
        const response = await fetch('https://cloudconnectcampaign.com/espicrmnew/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('authToken', data.access);
            console.log("Token refreshed successfully:", data.access);
            return data.access;
        } else {
            const errorData = await response.json();
            console.error('Failed to refresh token:', errorData);
            throw new Error('Failed to refresh token');
        }
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
}

export async function fetchEnquiries(setEnquiryData, setErrs) {
    const url = "https://cloudconnectcampaign.com/espicrmnew/api/enquiries/";
    let token = localStorage.getItem("authToken");

    try {
        let response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        if (response.status === 401) { // If unauthorized, try refreshing the token
            console.warn("Token expired, attempting to refresh...");
            token = await refreshToken();
            if (token) {
                response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });
            } else {
                throw new Error('Failed to refresh token');
            }
        }

        if (response.ok) {
            const data = await response.json();
            setEnquiryData(data.map((enquiry, index) => ({ ...enquiry, no: index + 1 })));
            console.log("Fetched enquiries successfully:", data);
        } else if (response.status === 500) {
            setErrs("Server Error: Could not retrieve data");
            console.error("Server error:", await response.json());
        } else {
            setErrs("Error While Fetching Data");
            console.error("Error fetching data:", await response.json());
        }
    } catch (error) {
        console.error("Fetching error:", error);
        setErrs("Network error, please try again later.");
    }
}
