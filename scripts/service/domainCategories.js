const Data = require("sf-core/data");
const sc = require("./index");
const { useMockService } = require("config");

function getDomainCategories(domainType) {
    if (useMockService) {

        let result = domainType === 1 ? [{
            "domainCategoryId": 1,
            "name": "E-Ticaret",
            "type": 1,
            "image": "/static/category/image/1.jpeg"
        }, {
            "domainCategoryId": 2,
            "name": "Haber Medya",
            "type": 1,
            "image": "/static/category/image/2.jpeg"
        }, {
            "domainCategoryId": 3,
            "name": "Sosyal",
            "type": 1,
            "image": "/static/category/image/3.jpeg"
        }, {
            "domainCategoryId": 4,
            "name": "Spor",
            "type": 1,
            "image": "/static/category/image/4.jpeg"
        }] : [{
            "domainCategoryId": 5,
            "name": "Instagram",
            "type": 2,
            "image": "/static/category/image/5.jpeg"
        }];

        return Promise.resolve(result);
    }
    return new Promise((resolve, reject) => {
        sc.request("/domain-categories?pageSize=100&pageNumber=1", {
                method: "GET",
                headers: {
                    "Token": Data.getStringVariable("userToken")
                }
            }).then(e => {
                let categories = e.domainCategories || [];
                resolve(categories.filter(p => p.type === domainType));
            })
            .catch(reject);
    });
}

module.exports = {
    getCategories: () => getDomainCategories(1),
    getApplications: () => getDomainCategories(2)
};
