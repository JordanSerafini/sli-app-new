import { RootState } from "..";
import { Item } from "../../types/item";

export const recipesByFamilySelector = (
  state: RootState,
  familyId: number | string
): Item[] => {
  // Convertit familyId en Number si c'est un string pour assurer une comparaison cohérente
  const numericFamilyId = typeof familyId === 'string' ? parseInt(familyId, 10) : familyId;

  return state.items.filter((item) => item.familyid === numericFamilyId);
};
