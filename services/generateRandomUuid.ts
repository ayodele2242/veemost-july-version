// generateRandomUuid.ts
function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function generateRandomUuid(): string {
    const uuid = `${getRandomInt(0, 65535).toString(16).padStart(4, '0')}${getRandomInt(0, 65535).toString(16).padStart(4, '0')}-${getRandomInt(0, 65535).toString(16).padStart(4, '0')}-${getRandomInt(16384, 20479).toString(16).padStart(4, '0')}-${getRandomInt(32768, 49151).toString(16).padStart(4, '0')}-${getRandomInt(0, 65535).toString(16).padStart(4, '0')}${getRandomInt(0, 65535).toString(16).padStart(4, '0')}${getRandomInt(0, 65535).toString(16).padStart(4, '0')}`;
  
    const formattedUuid = uuid.toUpperCase().substr(0, 32);
  
    const additionalCharacters = 32 - formattedUuid.length;
    const randomCharacters = Array.from({ length: additionalCharacters }, () => {
      return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(getRandomInt(0, 61));
    }).join('');
  
    return formattedUuid + randomCharacters;
  }
  
  export default generateRandomUuid;
  