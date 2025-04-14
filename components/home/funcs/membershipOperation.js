// handle fetch operation

let fetch;
const handleOpenAllMembers = (option, memberList, eventId, navigation, fetchMembership) => {
    fetch = fetchMembership;
	if (option === "membership") {
		// navigate to all membership screen and pass memberList
		navigation.navigate("AllEventMembers", { memberList, eventId, option });
	} else {
		// navigate to all membership screen and pass memberList
		navigation.navigate("AllEventMembers", { memberList, eventId, option });
	}
};

// base url
const baseUrl = process.env.BASE_URL;

// handle accept request
const handleAcceptMembershipRequest = async (
	setProcessing,
	eventId,
	userId,
	token,
	onSuccess,
) => {
	try {
		setProcessing(true);
		const response = await global.fetch(
			`${baseUrl}/event/events/${eventId}/approve-request`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ userId }),
			},
		);

		const data = await response.json();
		
		if (response.ok) {
			alert("Success", "Membership request accepted.");
			if (onSuccess) onSuccess(); // 🔁 Re-fetch updated membership list
		} else {
			console.log(data);
			alert("Error", data.message || "Could not accept membership.");
		}
	} catch (error) {
		console.error("Error processing membership:", error);
	} finally {
		setProcessing(false);
	}
};
// handle decline request
const handleDeclineMembershipRequest = async (
	setProcessing,
	eventId,
	userId,
	token,
	onSuccess
) => {
	try {
		setProcessing(true);
		const response = await global.fetch(
			`${baseUrl}/event/events/${eventId}/decline-request`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ userId }),
			},
		);

		const data = await response.json();
		if (response.ok) {
			alert("Success", "Membership request declined.");
			if (onSuccess) onSuccess(); // 🔁 Re-fetch updated membership list
		} else {
			console.log(data);
			alert("Error", data.message || "Could not decliine membership.");
		}
	} catch (error) {
		console.error("Error processing membership:", error);
	} finally {
		setProcessing(false);
	}
};

// handle view member details
const handleViewMemberDetails = async (userId, token, navigation) => {
    // fetch user details
    // navigate to memeber details screen and pass user details
    try {
        const response = await global.fetch(`${baseUrl}/user/get-user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Something went wrong!");
        }
        // navigate to member details screen and pass user details
        navigation.navigate("MemberDetails", { user: data });

    } catch (error) {
        console.error("Error Loading member details:", error);
        
    }
}

export {
	handleOpenAllMembers,
	handleAcceptMembershipRequest,
	handleDeclineMembershipRequest,
    handleViewMemberDetails
};
