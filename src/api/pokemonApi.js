const baseUrl = 'https://pokeapi.co/api/v2/'

function translateStatusToErrorMessage(status) {
    switch (status) {
        case 401:
            return 'Please login again.';
        case 403:
            return 'You do not have permission to view the game(s).';
        default:
            return 'There was an error retrieving the game(s). Please try again.';
    }
}

function checkStatus(response) {
    if (response.ok) {
        return response;
    } else {
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
        };
        console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

        let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errorMessage);
    }
}

function parseJSON(response) {
    return response.json();
}

// eslint-disable-next-line
function delay(ms) {
    return function (x) {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
    };
}

function makeQuery(endpoint) {
    return fetch(`${baseUrl}${endpoint}`)
    .then(checkStatus)
    .then(parseJSON)
    .catch((error) => {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    })
}

export const pokemonApi = {
    getPokemonsList(page) {
        return makeQuery(`pokemon/?limit=20&offset=${page}`);
    },
    getPokemon(query) {
        return makeQuery(`pokemon/${query}`);
    },
    getEvolutions(speciesId) {
        return makeQuery(`evolution-chain/${speciesId}`);
    },
    getSpecies(pokemonId) {
        return makeQuery(`pokemon-species/${pokemonId}`);
    },
    getAbility(ability) {
        return makeQuery(`ability/${ability}`);
    },
    getMove(move) {
        return makeQuery(`move/${move}`);
    },
    getPokedex(pokedex) {
        return makeQuery(`pokedex/${pokedex}`);
    },
    getType(type) {
        return makeQuery(`type/${type}`)
    }
}
