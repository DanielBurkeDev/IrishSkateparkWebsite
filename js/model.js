import { API_URL, RES_PER_PAGE } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  skatepark: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadPark = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}/`);
    console.log("loadPark", data);

    const { skatepark } = data;
    state.skatepark = {
      id: data.id,
      name: data.name,
      addrs: data.address,
      county: data.county,
      image: data.image,
      lat: data.latitude,
      long: data.county,
      phone: data.phone,
      email: data.email,
      website: data.website,
      descr: data.description,
      rating: data.rating,
      comment: data.comment,
      lights: data.lights,
      openhrs: data.openinghours,
      helmets: data.helmets,
      surface: data.surface,
      indoutd: data.indooroutdoor,
      fee: data.fee,
      pros: data.pros,
      cons: data.cons,
    };
  } catch (err) {
    console.error(`error: ${err} `);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.search.results = data.map((prk) => {
      return {
        id: prk.id,
        name: prk.name,
        addrs: prk.address,
        openhrs: prk.openinghours,
        surface: prk.surface,
        image: prk.image,
      };
    });
  } catch (err) {
    console.error(`error: ${err} `);
    throw err;
  }
};

export const getSearchResultsPage = function (page) {
  const start = (page - 1) * state.resultsPerPage; //0
  const end = page * state.search.resultsPerPage; //9
  return state.search.results.slice(start, end);
};

// export const skatepark = {
//   id: 1,
//   name: "Bushy Park",
//   image: "url to be added",
//   latitude: "53.3028785359254",
//   longitude: "-6.289155240275436",
//   address: "Bushy Park, Terenure, Dublin",
//   county: "",
//   phone: "none",
//   email: "none",
//   website: "none",
//   description:
//     "Main feature is a shallow and deep bowl and around the top there is a bump, a small flat rail, manny pad, a two step set of steps with small handrail.",
//   rating: 4,
//   comment: "Beside the tennis courts",
//   lights: "NO",
//   openinghours: "10.00 - 17.30",
//   helmets: "NO",
//   surface: "CONCRETE",
//   indooroutdoor: "OUTDOOR",
//   fee: "none",
//   pros: "",
//   cons: "",
// };
