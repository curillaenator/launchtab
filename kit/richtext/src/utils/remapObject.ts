const remapObject = <T extends Record<string, unknown>>(
    keysArray: (keyof T)[],
    initialObject: T
  ): Partial<T> => {
    const remappedObject: Partial<T> = {};
  
    keysArray.forEach(key => {
      if (initialObject.hasOwnProperty(key)) {
        remappedObject[key] = initialObject[key];
      }
    });
  
    return remappedObject;
  };
  
  export { remapObject };