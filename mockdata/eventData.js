const eventData = [
     {
    id: 1,
    eventName: "Summer Music Festival",
    eventDescription: "Join us for a day of live music performances by top artists!",
    eventImage: "https://img.freepik.com/premium-photo/blurred-concept-night-scene-concert-party-with-audience-colourful-led-lighting_42667-615.jpg?w=740",
    eventDate: "2024-07-20",
    eventLocation: "Central Park",
    eventTime: "12:00 PM - 10:00 PM",
    eventMembersRules: "Must be 18+ to attend.",
    eventCreator: "John Doe",
    eventMembers: ["Alice", "Bob", "Eve"],
    eventCost: "$500",
    isEventOpen: false,
    eventCategory: "Music",
    isEventPopular: true,
    isUpComingEvent: true,
    eventHashTags: ["Music", "Festival", "Summer"]
  },
  {
    id: 2,
    eventName: "Food Truck Festival",
    eventDescription: "Savor a variety of delicious cuisines from food trucks around the city!",
    eventImage: "https://img.freepik.com/free-photo/tender-hydrangea-centerpiece-wine-glasses-blurred-background_8353-10060.jpg?t=st=1708722706~exp=1708726306~hmac=4edb2b9f296f0615bbfdd799da14a2611178f28e5452b342661a6d2a1ec76c28&w=360",
    eventDate: "2024-08-15",
    eventLocation: "Downtown Square",
    eventTime: "11:00 AM - 8:00 PM",
    eventMembersRules: "Free entry for all ages.",
    eventCreator: "Jane Smith",
    eventMembers: ["Charlie", "David", "Grace"],
    eventCost: "Free",
    isEventOpen: true,
    eventCategory: "Food & Drink",
    isEventPopular: true,
    isUpComingEvent: true,
    eventHashTags: ["Food", "Festival", "StreetFood"]
  },
  {
    id: 3,
    eventName: "Art Exhibition: Modern Masterpieces",
    eventDescription: "Explore the world of contemporary art with stunning modern artworks!",
    eventImage: "https://img.freepik.com/premium-photo/wedding-reception-area-ready-guests-bridal-party_160672-13543.jpg?w=740",
    eventDate: "2024-09-05",
    eventLocation: "Art Gallery",
    eventTime: "10:00 AM - 6:00 PM",
    eventMembersRules: "Open to all art enthusiasts.",
    eventCreator: "Emily Brown",
    eventMembers: ["Oliver", "Sophia", "Liam"],
    eventCost: "$20",
    isEventOpen: true,
    eventCategory: "Art & Culture",
    isEventPopular: false,
    isUpComingEvent: true,
    eventHashTags: ["Art", "Exhibition", "ModernArt"]
  },
  {
    id: 4,
    eventName: "Fitness Bootcamp",
    eventDescription: "Get ready to sweat it out with a high-intensity fitness bootcamp session!",
    eventImage: "https://img.freepik.com/free-photo/happy-smiling-musicians-laughing-performing-stage-nightclub-party-carefree-energetic-electronic-music-band-singing-playing-clubbers-discotheque-club_482257-71785.jpg?t=st=1708722812~exp=1708726412~hmac=1f33daf0f1c12bd57c548073086dd020c54e83e058fef0b47b5d83b9f4d57543&w=740",
    eventDate: "2024-09-10",
    eventLocation: "City Park",
    eventTime: "9:00 AM - 11:00 AM",
    eventMembersRules: "All fitness levels welcome.",
    eventCreator: "Michael Johnson",
    eventMembers: ["Emma", "Noah", "Ava"],
    eventCost: "$25",
    isEventOpen: true,
    eventCategory: "Health & Wellness",
    isEventPopular: true,
    isUpComingEvent: true,
    eventHashTags: ["Fitness", "Bootcamp", "Exercise"]
  },
  {
    id: 5,
    eventName: "Tech Conference: Future Innovations",
    eventDescription: "Discover the latest trends and innovations in technology!",
    eventImage: "https://img.freepik.com/free-photo/building-night_1127-3369.jpg?t=st=1708722876~exp=1708726476~hmac=a375dc59563252b3b10d1072d44df144685c698b176dcc0cedeba944c67769b1&w=740",
    eventDate: "2024-09-25",
    eventLocation: "Convention Center",
    eventTime: "9:00 AM - 5:00 PM",
    eventMembersRules: "Tech enthusiasts and professionals only.",
    eventCreator: "Andrew Wilson",
    eventMembers: ["Isabella", "William", "Mia"],
    eventCost: "$100",
    isEventOpen: true,
    eventCategory: "Technology",
    isEventPopular: false,
    isUpComingEvent: true,
    eventHashTags: ["Tech", "Conference", "Innovation"]
  },
  {
    id: 6,
    eventName: "Fashion Show: Fall Collection",
    eventDescription: "Experience the latest trends in fashion at our exclusive fall collection showcase!",
    eventImage: "https://img.freepik.com/free-photo/stylish-african-american-woman-yellow-dreess-posed-mall_627829-2057.jpg?t=st=1708722958~exp=1708726558~hmac=6dcf4914e27fd1a0bcf0b2659272e6ce7eec8ed956cea44f89ef5ecb128f948c&w=740",
    eventDate: "2024-10-10",
    eventLocation: "Fashion Mall",
    eventTime: "7:00 PM - 9:00 PM",
    eventMembersRules: "Fashion enthusiasts and VIP guests only.",
    eventCreator: "Sophie Anderson",
    eventMembers: ["Lucas", "Chloe", "Ethan"],
    eventCost: "$75",
    isEventOpen: false,
    eventCategory: "Fashion",
    isEventPopular: true,
    isUpComingEvent: false,
    eventHashTags: ["Fashion", "Show", "FallCollection"]
  },
  {
    id: 7,
    eventName: "Cultural Festival: Celebrating Diversity",
    eventDescription: "Celebrate diversity with cultural performances, art exhibits, and delicious international cuisines!",
    eventImage: "https://img.freepik.com/free-photo/three-multicultural-women-street_1303-13442.jpg?t=st=1708723006~exp=1708726606~hmac=7f888739db1ab539555b8245a794ee98f712e234d6a758fe51b1858343d00982&w=740",
    eventDate: "2024-11-01",
    eventLocation: "City Square",
    eventTime: "11:00 AM - 7:00 PM",
    eventMembersRules: "Open to all cultures and communities.",
    eventCreator: "Mohammed Ali",
    eventMembers: ["Zoe", "Daniel", "Sophie"],
    eventCost: "Free",
    isEventOpen: true,
    eventCategory: "Culture",
    isEventPopular: true,
    isUpComingEvent: true,
    eventHashTags: ["CulturalFestival", "Diversity", "Celebration"]
  },
  {
    id: 8,
    eventName: "Film Festival: International Cinema",
    eventDescription: "Experience the magic of cinema with a curated selection of international films!",
    eventImage: "https://img.freepik.com/free-photo/three-multicultural-women-street_1303-13442.jpg?t=st=1708723006~exp=1708726606~hmac=7f888739db1ab539555b8245a794ee98f712e234d6a758fe51b1858343d00982&w=740",
    eventDate: "2024-11-15",
    eventLocation: "Cinema Palace",
    eventTime: "6:00 PM - 11:00 PM",
    eventMembersRules: "Film enthusiasts and movie buffs only.",
    eventCreator: "Julia Roberts",
    eventMembers: ["Henry", "Lily", "Max"],
    eventCost: "$30",
    isEventOpen: true,
    eventCategory: "Film",
    isEventPopular: true,
    isUpComingEvent: true,
    eventHashTags: ["FilmFestival", "Cinema", "InternationalFilms"]
  },
  {
    id: 9,
    eventName: "Gastronomy Tour: Culinary Adventure",
    eventDescription: "Embark on a gastronomic journey exploring the city's best culinary delights!",
    eventImage: "https://img.freepik.com/free-photo/dodgems-court-with-predominant-blue-motion-color_23-2148328054.jpg?t=st=1708723162~exp=1708726762~hmac=585afc1a0221a427674c9218b22c62632ff1a3d24fa5524b0fc0a485348cf27b&w=740",
    eventDate: "2024-12-05",
    eventLocation: "Various Locations",
    eventTime: "12:00 PM - 4:00 PM",
    eventMembersRules: "Food lovers and adventurers welcome.",
    eventCreator: "Natalie Johnson",
    eventMembers: ["Adam", "Sophie", "Jacob"],
    eventCost: "$60",
    isEventOpen: true,
    eventCategory: "Food & Drink",
    isEventPopular: true,
    isUpComingEvent: true,
    eventHashTags: ["Gastronomy", "Tour", "CulinaryAdventure"]
  },
  {
    id: 10,
    eventName: "Comedy Night: Stand-up Special",
    eventDescription: "Get ready for a night of laughter with top comedians performing live stand-up comedy!",
    eventImage: "https://img.freepik.com/premium-photo/firework-display-night_1048944-8322107.jpg?w=740",
    eventDate: "2025-01-10",
    eventLocation: "Comedy Club",
    eventTime: "8:00 PM - 10:00 PM",
    eventMembersRules: "Adults only (18+).",
    eventCreator: "Kevin Hart",
    eventMembers: ["Sophia", "Jack", "Ella"],
    eventCost: "$20",
    isEventOpen: true,
    eventCategory: "Entertainment",
    isEventPopular: true,
    isUpComingEvent: true,
    eventHashTags: ["ComedyNight", "StandUpComedy", "Laughs"]
  },
  {
    id: 11,
    eventName: "Tech Workshop: Web Development",
    eventDescription: "Learn the latest web development technologies and frameworks in this hands-on workshop!",
    eventImage: "https://img.freepik.com/free-photo/dodgems-court-with-predominant-blue-motion-color_23-2148328054.jpg?t=st=1708723162~exp=1708726762~hmac=585afc1a0221a427674c9218b22c62632ff1a3d24fa5524b0fc0a485348cf27b&w=740",
    eventDate: "2025-02-15",
    eventLocation: "Tech Hub",
    eventTime: "10:00 AM - 4:00 PM",
    eventMembersRules: "Tech enthusiasts and beginners welcome.",
    eventCreator: "Sarah Williams",
    eventMembers: ["Ethan", "Emily", "Liam"],
    eventCost: "$50",
    isEventOpen: true,
    eventCategory: "Technology",
    isEventPopular: true,
    isUpComingEvent: true,
    eventHashTags: ["Tech", "Workshop", "WebDevelopment"]
  },
  {
    id: 12,
    eventName: "Music Concert: Jazz Night",
    eventDescription: "Experience the soulful melodies of jazz with live performances by renowned jazz musicians!",
    eventImage: "https://img.freepik.com/premium-photo/firework-display-night_1048944-8322107.jpg?w=740",
    eventDate: "2025-03-20",
    eventLocation: "Jazz Club",
    eventTime: "7:00 PM - 11:00 PM",
    eventMembersRules: "Music lovers of all ages.",
    eventCreator: "Miles Davis",
    eventMembers: ["Olivia", "James", "Ava"],
    eventCost: "$35",
    isEventOpen: true,
    eventCategory: "Music",
    isEventPopular: true,
    isUpComingEvent: true,
    eventHashTags: ["Music", "Concert", "Jazz"]
  },
  {
    id: 13,
    eventName: "Fashion Week: Spring Collection",
    eventDescription: "Witness the latest trends in fashion at our exclusive spring collection showcase!",
    eventImage: "https://img.freepik.com/premium-photo/firework-display-night_1048944-8322107.jpg?w=740",
    eventDate: "2025-04-10",
    eventLocation: "Fashion Mall",
    eventTime: "6:00 PM - 10:00 PM",
    eventMembersRules: "Fashion enthusiasts and VIP guests only.",
    eventCreator: "Victoria Beckham",
    eventMembers: ["Alexander", "Luna", "Liam"],
    eventCost: "$100",
    isEventOpen: true,
    eventCategory: "Fashion",
    isEventPopular: true,
    isUpComingEvent: true,
    eventHashTags: ["FashionWeek", "SpringCollection", "Runway"]
  },
  {
    id: 14,
    eventName: "Food Festival: International Flavors",
    eventDescription: "Indulge in a culinary journey exploring flavors from around the world at our international food festival!",
    eventImage: "https://img.freepik.com/free-photo/young-adults-traveling-london_23-2149259473.jpg?t=st=1708723275~exp=1708726875~hmac=ae475645ebacc678899c230bb4e07515de256935c8535d5c2e08eaa9ca05cae5&w=740",
    eventDate: "2025-05-15",
    eventLocation: "Food Park",
    eventTime: "11:00 AM - 9:00 PM",
    eventMembersRules: "Food lovers of all ages.",
    eventCreator: "Gordon Ramsay",
    eventMembers: ["Emma", "Jacob", "Sophia"],
    eventCost: "Free entry, food prices vary.",
    isEventOpen: true,
    eventCategory: "Food & Drink",
    isEventPopular: true,
    isUpComingEvent: true,
    eventHashTags: ["FoodFestival", "InternationalFlavors", "Cuisine"]
  },
  {
    id: 15,
    eventName: "Film Premiere: Blockbuster Movie",
    eventDescription: "Be the first to watch the premiere of the highly-anticipated blockbuster movie!",
    eventImage: "https://img.freepik.com/free-photo/medium-shot-people-having-fun_23-2149128364.jpg?t=st=1708723328~exp=1708726928~hmac=db3c613932db8c2d0f1fab64f8fac0517295f59498265f6c07ad7acddc8710cf&w=740",
    eventDate: "2025-06-20",
    eventLocation: "Cinema Palace",
    eventTime: "7:00 PM - 10:00 PM",
    eventMembersRules: "Movie enthusiasts and VIP guests only.",
    eventCreator: "Steven Spielberg",
    eventMembers: ["Sophie", "Benjamin", "Charlotte"],
    eventCost: "$50",
    isEventOpen: true,
    eventCategory: "Film",
    isEventPopular: true,
    isUpComingEvent: true,
    eventHashTags: ["FilmPremiere", "Blockbuster", "MovieNight"]
  },
  {
    id: 16,
    eventName: "Art Workshop: Painting Masterclass",
    eventDescription: "Unleash your creativity in this hands-on painting masterclass with expert artists!",
    eventImage: "https://img.freepik.com/free-photo/family-enjoying-their-quality-winter-time_23-2149186219.jpg?t=st=1708723359~exp=1708726959~hmac=76a16c1d95bcdaf046cef0c2c962eafd05df7f2feca33c814ae3e0798e3ef360&w=740",
    eventDate: "2025-07-15",
    eventLocation: "Art Studio",
    eventTime: "10:00 AM - 2:00 PM",
    eventMembersRules: "Art enthusiasts of all levels.",
    eventCreator: "Pablo Picasso",
    eventMembers: ["Liam", "Ella", "Jacob"],
    eventCost: "$40",
    isEventOpen: true,
    eventCategory: "Art & Culture",
    isEventPopular: true,
    isUpComingEvent: true,
    eventHashTags: ["Art", "Workshop", "Painting"]
  },
  {
    id: 17,
    eventName: "Tech Summit: Future Trends",
    eventDescription: "Explore the future trends and innovations in technology at our tech summit!",
    eventImage: "https://img.freepik.com/free-photo/medium-shot-people-with-vr-glasses_23-2150433375.jpg?t=st=1708723420~exp=1708727020~hmac=9096dbce4e7a09ca0c3d54e14edff136a83b68c1bbceb01e22626488aa8ca9db&w=740",
    eventDate: "2025-08-10",
    eventLocation: "Tech Hub",
    eventTime: "9:00 AM - 6:00 PM",
    eventMembersRules: "Tech professionals and enthusiasts.",
    eventCreator: "Elon Musk",
    eventMembers: ["Ava", "Ethan", "Sophie"],
    eventCost: "$150",
    isEventOpen: true,
    eventCategory: "Technology",
    isEventPopular: true,
    isUpComingEvent: true,
    eventHashTags: ["Tech", "Summit", "FutureTrends"]
  },
]

export default eventData;