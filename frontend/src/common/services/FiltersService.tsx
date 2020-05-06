import { FilterOptions } from "../../models/FiltersData";

interface FilterOptionsService<T extends FilterOptions> {
  getFilterOptions(): Promise<T>;
}

export default FilterOptionsService;
