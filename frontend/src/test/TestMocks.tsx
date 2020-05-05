import ModelInstanceService from "../common/services/ModelInstanceService";
import { spy } from "sinon";
import { ObjectsPage } from "../models/ObjectsPage";

export function mockModelInstanceService<T>(
  o?: T,
  p?: ObjectsPage<T>
): ModelInstanceService<T> {
  return {
    getInstanceById: spy((id: string) => new Promise<T>(() => o)),
    getModelPageOfInstances: spy(
      (pageNumber: number, options?: any) =>
        new Promise<ObjectsPage<T>>(() => p)
    ),
  };
}
