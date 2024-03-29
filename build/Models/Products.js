"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserFavorites = exports.toggleProductFavorites = exports.updateProduct = exports.createProduct = exports.getRecentProducts = exports.searchProducts = exports.getAllProducts = exports.findProductWithId = void 0;
var mongodb_1 = require("mongodb");
var index_1 = require("../db/index");
var getAllProductsProj = {
    name: 1,
    description: 1,
    photos: 1,
    mainImage: 1,
    shipping: 1,
    return: 1,
    infoGuide: 1,
    price: 1,
    sale: 1,
    options: 1,
    stock: 1,
    sku: 1,
    category: 1,
    subCategory: 1,
};
var searchProductProj = {
    name: 1,
    photos: { $slice: 1 },
    price: 1,
    category: 1,
    subCategory: 1,
};
var findProductWithId = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productId = new mongodb_1.ObjectID(id);
                return [4 /*yield*/, (0, index_1.findOne)("products", { _id: productId })];
            case 1:
                product = _a.sent();
                return [2 /*return*/, product];
        }
    });
}); };
exports.findProductWithId = findProductWithId;
var getAllProducts = function (limit, skip, category, subCategory) {
    if (skip === void 0) { skip = 0; }
    return __awaiter(void 0, void 0, void 0, function () {
        var options;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = { projection: getAllProductsProj };
                    console.log('skip');
                    console.log(skip);
                    console.log('limit');
                    console.log(limit);
                    if (!(category && subCategory)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, index_1.findMany)("products", { category: { $in: [category] }, subCategory: { $in: [subCategory] } }, options, skip, limit, "views")];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    if (!category) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, index_1.findMany)("products", { category: { $in: [category] } }, options, skip, limit, "views")];
                case 3: return [2 /*return*/, _a.sent()];
                case 4: return [4 /*yield*/, (0, index_1.findMany)("products", {}, options, skip, limit, "views")];
                case 5: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
exports.getAllProducts = getAllProducts;
var searchProducts = function (tag) { return __awaiter(void 0, void 0, void 0, function () {
    var options, regex;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options = { limit: 8, projection: searchProductProj };
                regex = new RegExp(tag, "gi");
                return [4 /*yield*/, (0, index_1.findMany)("products", {
                        $or: [
                            { category: { $in: [tag] } },
                            { subCategory: { $in: [tag] } },
                            { name: { $regex: regex } },
                        ],
                    }, options, 0, 0, "views")];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.searchProducts = searchProducts;
var getRecentProducts = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var convertedId, query;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                convertedId = new mongodb_1.ObjectID(id);
                query = id ? { _id: { $ne: convertedId } } : {};
                console.log("getting recent products");
                console.log("query:");
                console.log(query);
                return [4 /*yield*/, (0, index_1.findMany)("products", query, { limit: 8, projection: getAllProductsProj }, 0, 0, "created_at")];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getRecentProducts = getRecentProducts;
var createProduct = function (newProduct) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, index_1.insertOne)("products", newProduct)];
            case 1:
                product = _a.sent();
                return [2 /*return*/, product === null || product === void 0 ? void 0 : product.result.ok];
        }
    });
}); };
exports.createProduct = createProduct;
var updateProduct = function (rowId, updateFields) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productId = new mongodb_1.ObjectID(rowId);
                return [4 /*yield*/, (0, index_1.updateOne)("products", { _id: productId }, { $set: updateFields })];
            case 1:
                product = _a.sent();
                return [2 /*return*/, product === null || product === void 0 ? void 0 : product.result.ok];
        }
    });
}); };
exports.updateProduct = updateProduct;
var toggleProductFavorites = function (userId, productId) { return __awaiter(void 0, void 0, void 0, function () {
    var isProductFavoritted, deleteFavoritted, newFavorite, addedToFavorites;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, index_1.findOne)("favorites", { userId: userId, productId: productId })];
            case 1:
                isProductFavoritted = _a.sent();
                if (!isProductFavoritted) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, index_1.deleteOne)("favorites", {
                        userId: userId,
                        productId: productId,
                    })];
            case 2:
                deleteFavoritted = _a.sent();
                return [2 /*return*/, deleteFavoritted];
            case 3:
                newFavorite = {
                    userId: userId,
                    productId: productId,
                };
                return [4 /*yield*/, (0, index_1.insertOne)("favorites", newFavorite)];
            case 4:
                addedToFavorites = _a.sent();
                return [2 /*return*/, addedToFavorites];
        }
    });
}); };
exports.toggleProductFavorites = toggleProductFavorites;
var findUserFavorites = function (userId, productIds) { return __awaiter(void 0, void 0, void 0, function () {
    var product_ids, user_id, addedToFavorites;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                product_ids = productIds.map(function (id) { return new mongodb_1.ObjectID(id); });
                user_id = new mongodb_1.ObjectID(userId);
                return [4 /*yield*/, (0, index_1.findOne)("favorites", {
                        $and: [{ userId: user_id }, { productId: { $in: product_ids } }],
                    })];
            case 1:
                addedToFavorites = _a.sent();
                return [2 /*return*/, addedToFavorites];
        }
    });
}); };
exports.findUserFavorites = findUserFavorites;
