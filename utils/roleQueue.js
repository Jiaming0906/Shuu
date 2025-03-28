class RoleQueue {
    constructor(){
        this.queue = [];
        this.isProcessing = false;
        this.delay = 250; //ms; safe for 40 roles/10 seconds
    }

    async add(member, roleId) {
        this.queue.push({ member, roleId });
        this.process();
    }

    async process() {
        if (this.isProcessing || this.queue.length === 0) return;

        this.isProcessing = true;
        const { member, roleId } = this.queue.shift();

        try {
            const role = await member.guild.roles.fetch(roleId);
            if (role) {
                await member.roles.add(role);
                //console.log(`Role added to ${member.user.tag}`);
            }
        } catch (error) {
            if (error.code === 429) {
                //rate limited
                console.log("Rate limited. Waiting...");
                this.delay = 2000; //increase delay temporarily

                this.queue.unshift({ member, roleId }); //re add to front of queue

            } else {
                console.log(`Failed to add role to ${member.user.tag}`, error.message);
            }
        } finally {
            this.isProcessing = false;

            setTimeout(() => this.process(), this.delay);

            //gradually return to normal speed

            if (this.delay > 250) {
                this.delay = Math.max(250, this.delay - 100);
            };
        }
    }
}

module.exports = new RoleQueue(); //Singleton instance