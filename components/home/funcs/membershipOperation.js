import { set } from "@gluestack-style/react";
import { se } from "rn-emoji-keyboard";

const handleOpenAllMembers = (option, memberList, eventId, navigation) => { 
    if (option === "membership") {
        // navigate to all membership screen and pass memberList
        navigation.navigate("AllEventMembers", {memberList, eventId, option})
    } else {
        // navigate to all membership screen and pass memberList
        navigation.navigate("AllEventMembers", {memberList, eventId, option})
    }
}

// base url
const baseUrl = process.env.BASE_URL;

// handle accept request
const handleAcceptMembershipRequest = async (setProcessing, eventId, userId, token) => {
    console.log("eventId", eventId);
    console.log("userId", userId);
    console.log("token", token);
    console.log(setProcessing)
    try {
        setProcessing(true);
        const response = await fetch(`${baseUrl}/event/events/${eventId}/approve-request`, {
            method: "",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId }),
        });

        const data = await response.json();
        if (!response.ok) {
            setProcessing(false);
            throw new Error(data.message || "Something went wrong!");
        }
        setProcessing(false);
        return data;
    } catch (error) {
        setProcessing(false);
        console.error("Error processing membership:", error);
    }
}
// handle decline request
const handleDeclineMembershipRequest = async (setProcessing, eventId, userId, token) => {
    try {
        setProcessing(true);
        const response = await fetch(`${baseUrl}/event/events/${eventId}/approve-request`, {
            method: "",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId }),
        });

        const data = await response.json();
        if (!response.ok) {
            setProcessing(false);
            throw new Error(data.message || "Something went wrong!");
        }
        setProcessing(false);
        return data;
    } catch (error) {
        setProcessing(false);
        console.error("Error processing membership:", error);
    }
}

// handle view member details



export { handleOpenAllMembers, handleAcceptMembershipRequest, handleDeclineMembershipRequest };

