module.exports = {
  /**
   * Initial welcome
   */
  welcome: `Thank you for contacting Co-Win!⚽

Welcome to the best social network for Sport lovers..
You are just few steps away from meeting your Co-Winners


Kindly save our contact as "Co-Win" and restrict us from seeing your status updates.`,
  /**
 * Bot awareness
 */
  welcome2: `*⚠️ Please be aware that you are currently in conversation with the Co-Win bot 🤖 and we kindly request you to provide us with your most accurate information.*`,
  /**
   * Enter your fullname prompt
   */
  fullname: "Kindly provide us with your name... (Example: JOHN):",
  /**
   * COnfirm fullname prompt
   */
  fullnameConfirm: fullname =>
    `I'll Call you "${fullname}", is that okay? (yes / no)`,
  /**
   * Favourite club prompt
   */
  favClub: `What's your favorite football club ?

 1. A.C. Milan 
 2. Arsenal
 3. Atletico de Madrid 
 4. Barcelona 
 5. Bayern Munich 
 6. Chelsea FC
 7. Dortmund
 8. Inter Milan
 9. Juventus
10. Liverpool FC 
11. Manchester City
12. Manchester United
13. Napoli 
14. PSG
15. Real Madrid

Choose the number that corresponds to your preferred club ( Example: for Manchester City, write "11")

Or input the name of your preferred club. (Example: Co-Win FC)`,
  /**
 * favClub wrong number
 */
  favClubWrongNumber: num => `${num} is a wrong input, try again:`,
  /**
 * Confirmation for favourite club
 */
  favClubConfirm: club => `Is your favourite club "${club}"? (yes / no):`,
  /**
   * welcome to the ultimate
   */
  welcomeUltimate: name => `Hey ${name},
Welcome to Co-Win⚽, the ultimate platform for sports enthusiasts🤸‍♂️ and prediction wizards! We're thrilled to have you onboard as a user of our innovative platform.Get ready to embark on an exhilarating journey where you collaborate with like-minded users to predict outcomes and secure 100% wins in the world of sports. 

With Co-Win, you not only experience the thrill 😱 of the game but also stand a chance to win fantastic cash prizes💰. Get ready to conquer the sports world together and celebrate multiple victories.

Join us in our collaborative effort to maximize wins on sports tickets and participate in our weekly giveaways, all centered around the world of sports. We aim high and make every win count. Let the games begin!🏆🎉`,
  /**
 * welcome (co winners group)
 */
  welcomeCoWinners: `Co-Winners Group🟠

What's the process like? 
How does the Co-Winners platform work? 
How can I take part?

It's a straightforward process. Participants are grouped into sets of 20, 10, or 5 members based on the plan. Each participant analyzes upcoming weekend and mid week games from various sports 🏐 and leagues like soccer⚽, basketball 🏀, tennis 🎾, and more🤸‍♂️. They select one game they're confident about, post it in their group, and include a stake starting from #50.

After confirming payments, the chosen games are collectively played on partner betting sites. The resulting booking codes and coupon codes are shared with the respective groups. The booking codes are also made available on our status for individual review and choice play... When a bet wins✅, the winnings are equally divided among the Co-Winners of that ticket. The competition also includes a championship prize for the best-performing group.🫂💯

It's important to note that Co-Win doesn't benefit from losses; it gains a 4% share only from Co-Winners' winnings.

You win, we all win! 💪 `,
  final: `Welcome to Co-Win, your gateway to a world of collaborative sports prediction and 100% wins! We are thrilled to have you on board. Get ready to join a community of passionate sports enthusiasts who are geared up to dominate the game with their collective knowledge and expertise. Let's predict, play, and celebrate victories together!`
};
