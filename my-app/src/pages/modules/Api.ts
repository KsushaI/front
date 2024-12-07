import { VISAS_MOCK } from "../modules/mock";

export interface Visa {
  pk: number;
  type: string;
  price: number;
  url: string;
  //status: string; // Added to reflect the response
  //description: string | null; // Can be null
  //creator: string | null; // Can be null
}
export interface VisasResult {
  user_draft_app_id: number | null;
  number_of_services: number;
  services: Visa[];
}


export const getVisaByPrice = async (price = ''): Promise<VisasResult> => {
  
  return fetch(`http://localhost:4000/visas_api/?visa_price=${price}`)
    .then((response) => response.json())
    //.catch(() => ({ /*resultCount:0,*/ services: [] }))
    .catch(() => {
      const searchPrice = parseFloat(price);

      if (price === '') {
        return { services: VISAS_MOCK.services }
      } if (isNaN(searchPrice)) {
        return { services: [] };
      }
      return {
        services: VISAS_MOCK.services.filter((item) => {
          return item.price <= searchPrice;
        })
      };
    })
}


export const getVisaById = async (
  id: number | string
): Promise<Visa> => {
  
  return fetch(`http://localhost:4000/visas_api/${id}`).then(
    (response) => response.json())
    .catch(() => { 
      const visa = VISAS_MOCK.services.find((service) => service.pk === Number(id));
      console.log(visa)
      return visa || null; })
};
