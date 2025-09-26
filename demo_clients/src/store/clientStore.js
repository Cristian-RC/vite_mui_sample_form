const STORE_KEY = "nene_clients";


export function getClients() {
    try {
        const raw = localStorage.getItem(STORE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.error("Failed to parse clients from localStorage", e);
        return [];
    }
}


export function saveClient(client) {
    const list = getClients();
    const id = crypto.randomUUID();
    const withID = { id, ...client };
    localStorage.setItem(STORE_KEY, JSON.stringify([withID, ...list]));
    return withID;
}


export function deleteClient(id) {
    const list = getClients();
    const filtered = list.filter((c) => c.id !== id);
    localStorage.setItem(STORE_KEY, JSON.stringify(filtered));
}