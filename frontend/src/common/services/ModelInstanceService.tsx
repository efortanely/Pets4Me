import { ObjectsPage as ModelPage } from '../../models/ObjectsPage';

interface ModelInstanceService<T> {
  getModelPageOfInstances(pageNumber: number, search?: string, filterString?: string): Promise<ModelPage<T>>
  getInstanceById(id: string): Promise<T>
}

export default ModelInstanceService