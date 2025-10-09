import { db } from "../../../hooks.server.js";

function getProducts() {
    return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { name: 'asc' }
    });
}
export const load = async () => {
    return {
        products: await getProducts()
    };
};