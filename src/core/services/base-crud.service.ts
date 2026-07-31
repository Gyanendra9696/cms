export class BaseCrudService<T> {
  protected dummy(entity: T) {
    return entity;
  }
}
