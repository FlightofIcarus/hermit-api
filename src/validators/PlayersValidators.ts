 function playerInputValidator(playerData: any) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!playerData.name || !playerData.nickname || !playerData.email || !playerData.password) {
        throw new Error("Invalid player data. Please provide all required fields.");
      }else if (playerData.name.trim() === "" || playerData.nickname.trim() === "" || playerData.email.trim() === "" || playerData.password.trim() === "") {
        throw new Error("Invalid player data. Please provide all required fields.");
      }else if (playerData.email.indexOf("@") === -1 || playerData.email.indexOf(".") === -1 || !emailRegex.test(playerData.email)) {
        throw new Error("Invalid player data. Please provide a valid email address.");
      }

        return true;
    };

    export { playerInputValidator };