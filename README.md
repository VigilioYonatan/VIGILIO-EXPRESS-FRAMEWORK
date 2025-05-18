# test

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.42. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.



<!-- TEST -->
| Matcher                           | Descripción breve                                       | Ejemplo TypeScript |
|----------------------------------|----------------------------------------------------------|--------------------|
| `toEqual(value)`                | Compara objetos o arrays profundamente                  | `expect(obj).toEqual({ a: 1, b: 2 });` |
| `toBe(value)`                   | Comparación estricta (`===`)                            | `expect(status).toBe(200);` |
| `toMatchObject(obj)`            | Compara parcialmente un objeto                          | `expect(body).toMatchObject({ success: true });` |
| `toContain(item)`               | Verifica si un array o string contiene un valor         | `expect(['a', 'b']).toContain('a');` |
| `toHaveLength(n)`               | Verifica longitud de array, string, etc.                | `expect(users).toHaveLength(3);` |
| `toBeDefined()`                 | Verifica que el valor no es `undefined`                 | `expect(token).toBeDefined();` |
| `toBeUndefined()`               | Verifica que el valor es `undefined`                    | `expect(result).toBeUndefined();` |
| `toBeNull()`                    | Verifica que el valor es `null`                         | `expect(response.data).toBeNull();` |
| `toBeTruthy()`                  | Verifica que el valor es "true" en contexto booleano    | `expect(flag).toBeTruthy();` |
| `toBeFalsy()`                   | Verifica que el valor es "false" en contexto booleano   | `expect(hasError).toBeFalsy();` |
| `toMatch(regex|string)`         | Verifica coincidencia con regex o substring             | `expect(message).toMatch(/success/i);` |
| `toBeInstanceOf(class)`         | Verifica la instancia de una clase                      | `expect(user).toBeInstanceOf(User);` |
| `toThrow(error?)`               | Verifica que una función lanza error                    | `expect(() => throwError()).toThrow();` |
| `toHaveProperty(key, val?)`     | Verifica que un objeto tiene una propiedad              | `expect(obj).toHaveProperty('id', 123);` |
| `toStrictEqual(value)`          | Igual a `toEqual` pero más estricto                     | `expect(data).toStrictEqual({ a: 1, b: undefined });` |
| `toBeGreaterThan(number)`       | Verifica si es mayor que el número dado                 | `expect(score).toBeGreaterThan(50);` |
| `toBeLessThan(number)`          | Verifica si es menor que el número dado                 | `expect(price).toBeLessThan(1000);` |
| `toBeGreaterThanOrEqual(num)`   | Verifica si es mayor o igual que el número              | `expect(age).toBeGreaterThanOrEqual(18);` |
| `toBeLessThanOrEqual(num)`      | Verifica si es menor o igual que el número              | `expect(temp).toBeLessThanOrEqual(30);` |
| `resolves.toBe(...) / rejects.toThrow(...)` | Para promesas exitosas o fallidas     | `await expect(fetchData()).resolves.toBe('OK');`<br>`await expect(fetchData()).rejects.toThrow();` |


<!--  -->
PRODUCTION MODE
change production .env