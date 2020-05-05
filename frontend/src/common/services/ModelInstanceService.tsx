import { ObjectsPage as ModelPage } from "../../models/ObjectsPage";

export interface GetPageOptions {
  resultsPerPage?: number;
  filterString?: string;
  search?: string;
}

interface ModelInstanceService<T> {
  getModelPageOfInstances(
    pageNumber: number,
    options?: GetPageOptions
  ): Promise<ModelPage<T>>;
  getInstanceById(id: string): Promise<T>;
}

export default ModelInstanceService;
