import { RootState } from "..";
import { Item } from "../../types/item";

export const recipesByFamilySelector = (
  state: RootState,
  familyId: number | string
): Item[] => {
  const numericFamilyId = typeof familyId === 'string' ? parseInt(familyId, 10) : familyId;

  return state.item.items.filter((item) => {
    const itemFamilyIdNumeric = item.familyid ? parseInt(item.familyid, 10) : null;
    
    return itemFamilyIdNumeric === numericFamilyId;
  });
};
