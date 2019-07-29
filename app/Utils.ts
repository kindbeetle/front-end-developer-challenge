export class Utils {
  public static delay = async (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  public static logError = (...e: string[]) => console.log(...e);

  public static noop = () => {};
}
