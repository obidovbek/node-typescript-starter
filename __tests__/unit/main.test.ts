// src/main.ts

// Define delay times in milliseconds
export const Delays = {
  Short: 500,
  Medium: 1000,
  Long: 2000,
};

/**
 * Greets a user with a delay.
 * @param name - The name of the user to greet
 * @returns A promise that resolves with a greeting message after a delay
 */
export function greeter(name: string): Promise<string> {
  return new Promise((resolve) => {
    // Delay the greeting using setTimeout
    setTimeout(() => {
      resolve(`Hello, ${name}`);
    }, Delays.Long); // The test expects a delay of Delays.Long (2000 ms)
  });
}
