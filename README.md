# StockSense 📈

A stock trading simulation app designed for newcomers to practice and learn about stock trading risk free.

To visit the deployed site, click [here](https://stock-sense.vercel.app/)!

To see a video of the site in action, click [here](https://videos.ctfassets.net/a5vwobnw8y4s/SHXJojdes0OFlOADwCEfF/dfdf9f924189d49b2988355c5c5c17e1/stock-sense-cover-video.mp4)!

This app was built by [Lee Sheppard](https://www.linkedin.com/in/leesheppard244) and [Lvan Ni](https://www.linkedin.com/in/lvan-ni/)

<br>

## Features

- **Default Homepage**

  When users first arrive to the app, they are able to view a defualt watchlist of predetermined stocks, showing their current price and percentage change from the day before and are also able to search for stocks on the New York Stock Exchange as well as the NASDAQ.
  
- **User Authentication**

  Users are able to both sign in and register via Google and GitHub via NextAuth. If the user is a returning user, then their data will be returned from MongoDB, else if the user is a first timer, an instance will be generated in the database and then the user will be logged in. If the user registers with github and later signs back in with Google, no problems!

- **User Homepage**

  One the user has logged in, they will be taken to the User Homepage where they will be able to:
  - Track open trades
  - View current portfolio profit/loss
  - View current portfolio balance
  - View cash balance
  - View the total amount they have invested
 
- **Stock Search**

  Users are able to search for stocks via the Searchbar on the default and user homepage. As they type, they will see search suggestions of stocks from the NYSE and NASDAQ. If they click on any of the results, they will be taken to the stock chart.

- **Stock Charts**: Implemented via ApexCharts, users are able to see the stock data in the form of a candlestick chart for timeframes:
  - 1 Day
  - 1 Week
  - 1 Month
  - 3 Months
  - 1 Year
  Here, if the user is logged in, they will be able to buy the stock, and if they already own some, here they can sell them as well.
  
- **Real-time Data**: The data for all the stocks available is supplied by Twelve Data. Each page reload generates a new API call making sure that the users will have the real time price when they are using the app.

<br>

## Tech Stack

- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Twelve Data API](https://twelvedata.com/)
- [ApexChart](https://apexcharts.com/)
- [NextAuth](https://next-auth.js.org/)
- [Material UI](https://mui.com/)

<br>

## User Stories Map

| Release | User Login | Stock Availability | Graphing Tools | Learning | Buy/Sell Stocks | Graph Style | Other
| - | - | - | - | - | - | - | - | 
| MVP | Google & Github | NYSE & NASDAQ | | Trends | Whole Shares | Candlestick
| V2 | Username & Password | | Line Tool, RSI, EMA | Graphing Tool Guides | Fractional Shares| Line | Stock News
| V3 | | Subscription Based Markets | | New User Onboarding | | | 

<br>

### Lighthouse Performance

<details>
  <summary>&nbsp;&nbsp;Default Homepage</summary>
  <br>
  <img width="751" alt="homepage-performance" src="https://github.com/Lee-Lvan/stock-sense/assets/62091613/2301aca1-7073-4528-a3df-cbc6eb0f485b">
</details>

<details>
  <summary>&nbsp;&nbsp;User Homepage</summary>
  <br>
  <img width="751" alt="user-homepage-performance" src="https://github.com/Lee-Lvan/stock-sense/assets/62091613/da89bd4e-da61-4e37-a010-e458027bd298">
</details>

<details>
  <summary>&nbsp;&nbsp;Stock Chart</summary>
  <br>
  <img width="751" alt="graph-performance" src="https://github.com/Lee-Lvan/stock-sense/assets/62091613/732e6bf8-6fc9-45ea-a4d1-f1264f69db31">
</details>

### Wireframes
<details>
  <summary>&nbsp;&nbsp;Lo-Fi Wireframes</summary>
  <br>
  
  - Default Homepage
  
  <img width="365" alt="default-homepage" src="https://github.com/Lee-Lvan/stock-sense/assets/62091613/2d8913f6-8ce1-420d-83e5-1d99fdc25ee5">
  <br>
  <br>
  
  - Sign In
  
  <img width="365" alt="signin" src="https://github.com/Lee-Lvan/stock-sense/assets/62091613/164eff17-725a-4746-a218-c1cb14fb9916">
  <br>
  <br>
  
  - User Homepage
  
  <img width="275" alt="user-homepage" src="https://github.com/Lee-Lvan/stock-sense/assets/62091613/9717106b-2466-4b7c-b588-aee671b2c934">
  <br>
  <br>
  
  - Stock Chart
  
  <img width="315" alt="stock-chart" src="https://github.com/Lee-Lvan/stock-sense/assets/62091613/a6593dea-6344-4111-9638-694635c1c0ea">
  <br>
  <br>
  
  - Buy/Sell Pages
  
  <img width="723" alt="buy-sell" src="https://github.com/Lee-Lvan/stock-sense/assets/62091613/f59d6113-f6b1-413f-bc00-d5439e955f3e">
</details>

<details>
  <summary>&nbsp;&nbsp;Hi-Fi Wireframes</summary>
  <br>

  - Default Homepage
  
  <img width="341" alt="hifi-default-homepage" src="https://github.com/Lee-Lvan/stock-sense/assets/62091613/9c91b85d-9f50-4c6e-9ac1-edb6f5a87143">
  <br>
  <br>

  - Sign In

  <img width="341" alt="hifi-signin" src="https://github.com/Lee-Lvan/stock-sense/assets/62091613/24294bfc-bf5c-4e24-9c3c-b0180f23c26a">
  <br>
  <br>

  - User Homepage

  <img width="251" alt="hifi-user-homepage" src="https://github.com/Lee-Lvan/stock-sense/assets/62091613/016956c5-e590-472b-b43e-dd621d658e87">
  <br>
  <br>

  - Buy/Sell Page
  <img width="704" alt="hifi-buy-sell" src="https://github.com/Lee-Lvan/stock-sense/assets/62091613/c0d4047a-3f6f-4794-acd6-5f1914d96817">
  <br>
  <br>

  - Stock Chart
    
  <img width="369" alt="hifi-stock-chart" src="https://github.com/Lee-Lvan/stock-sense/assets/62091613/36db667f-70e8-4569-8f97-2aa4a42ad29a">
</details>


<!--
Lees' [GitHub](https://github.com/coolusername244)

Lees' [LinkedIn](https://www.linkedin.com/in/leesheppard244)
<br>

Lvans' [GitHub](https://github.com/lvan-ni)

Lvans' [LinkedIn](https://www.linkedin.com/in/lvan-ni/)


-->
