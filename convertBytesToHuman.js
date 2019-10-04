/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export default function convertBytesToHuman(bytes) {
  // your solution goes here
  if (typeof(bytes) === "number" && bytes >= 0) {
      let i, div = 0;
      for (i = 0; bytes >= 1024 && i < 4; i++) {
        div = bytes % 1024 / 1024;
        bytes = Math.floor(bytes / 1024) + div
      }
      let prefix;
      i == 0 ? prefix = '' : prefix = 'KMGT'[i - 1];
      div == 0 ? bytes = String(bytes) : bytes = bytes.toFixed(2);
      return bytes + ' ' + prefix + 'B'
  }
  return false
}