import React from 'react';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import upwardstrend from '../images/upwardstrend.png';
import downwardstrend from '../images/downwardstrend.png';
import sidewaystrend from '../images/sidewaystrend.png';

const LearnMode = () => {
  return (
    <>
      <Navbar />
      <div className="learn-layout">
        <h1>Stock Market Basics</h1>
        <h2>Welcome to your first step on the exciting journey of stock trading!</h2>
        <h3>Introduction to the Stock Market</h3>
        <p>
          The stock market, in its simplest form, is a marketplace for buying and selling shares of
          publicly-traded companies. Imagine a bustling market, but instead of fruits or clothes,
          people are buying and selling ownership pieces of companies! Sounds cool, right? But why
          do we need it?
        </p>
        <p>
          Companies need capital to grow and expand their business. One way they can raise this
          capital is by selling off pieces of their company, known as stocks or shares, to the
          public. The stock market acts as a facilitator for this process. In return for their
          investment, stockholders hope the company will be successful and their shares will
          increase in value. They might also receive a part of the company&apos;s profits in the form of
          dividends.
        </p>
        <p>
          The stock market is the pulse of the economy, reflecting the overall health of the
          country&apos;s business sector.
        </p>
        <h3> Understanding Key Terms </h3>
        <p>Here are some of the key terms you&apos;ll need to know:</p>
        <ul>
          <li>
            Stock: A stock represents ownership in a company and constitutes a claim on part of the
            company&apos;s assets and earnings.
          </li>
          <li>Shares: These are the individual units of a company&apos;s stock that investors buy.</li>
          <li>
            Dividends: These are a portion of a company&apos;s earnings that are paid out to
            shareholders, typically on a quarterly basis.
          </li>
          <li>
            Market Order: This is an order to buy or sell a stock immediately at the best available
            current price.
          </li>
        </ul>
        <h3>Overview of Major Stock Exchanges</h3>
        <p>Let&apos;s take a world tour of some of the major stock exchanges:</p>
        <ul>
          <li>
            New York Stock Exchange (NYSE): One of the world&apos;s largest stock exchanges by market
            capitalization, located in New York City, USA.
          </li>
          <li>
            NASDAQ: Known for its large volume of technology stocks, it&apos;s also based in the USA.
          </li>
          <li>
            London Stock Exchange (LSE): One of the oldest stock exchanges in the world, located in
            London, UK.
          </li>
        </ul>
        <p>
          These stock exchanges, along with others around the globe, serve as hubs where buyers and
          sellers meet to trade stocks during defined hours. They provide the infrastructure and
          regulations that ensure fair trading.
        </p>
        <h2>The Upwards Trend</h2>
        <p>
          When we talk about an upwards trend in the stock market, it means that the prices of
          certain stocks are going up over time. This is good news for investors because it shows
          that people are interested in buying those stocks, and the value is increasing. It&apos;s like
          a positive signal that investors are feeling confident about the companies behind the
          stocks and their future growth. During an upwards trend, people who own those stocks may
          see their investment grow and make some money.
        </p>
        <p>
          An upwards trend happens when more and more people want to buy a particular stock. This
          usually occurs because the company is doing well, making profits, or has exciting plans
          for the future. As the demand for the stock increases, the price goes up too. When
          investors see this happening, they might think it&apos;s a good time to get in on the action
          and buy some of those stocks too. This can create a cycle where more people buying leads
          to even more price increases.
        </p>
        <p>
          For investors, spotting an upwards trend is essential because it can be an opportunity to
          make money. They use tools and methods to understand if a stock is on an upwards trend.
          Some look at the history of the stock&apos;s prices, while others analyze the company&apos;s
          performance and financial health. When they see a trend going up, they might decide to
          invest their money in those stocks, hoping the prices will keep rising.
        </p>
        <Image src={upwardstrend} width={500} height={500} alt="Upwards Trend" className='learn-img'/>
        <h2>The Downwards Trend</h2>
        <p>
          A downward trend in the stock market means that stock prices are going down over time.
          This can happen when many investors are selling their stocks, and not many people are
          buying. During a downward trend, investors might lose money because the value of their
          stocks decreases. It&apos;s like a signal that people are worried about the economy or
          companies&apos; performance, and they don&apos;t want to invest in stocks.
        </p>
        <p>
          In a downward trend, bad news about the economy or companies can make investors feel
          uncertain and scared. They may decide to sell their stocks to avoid losing more money,
          which can cause prices to fall even more. During this time, people might prefer to invest
          in safer things, like bonds or gold, to protect their money.
        </p>
        <p>
          Recognizing a downward trend early is important for investors to protect their savings.
          Some tools can help figure out if the trend is going down, like looking at how stock
          prices have been changing. Investors might also look at how well companies are doing and
          if they expect things to get better soon. If they think stocks will keep going down, they
          might choose to sell or keep more money in cash for now. It&apos;s essential to stay informed,
          be patient, and not make hasty decisions during a downward trend.
        </p>
        <Image src={downwardstrend} width={500} height={500} alt="Upwards Trend" className='learn-img'/>
        <h2>The Sideways Trend</h2>
        <p>
          A sideways trend in the stock market occurs when the prices of stocks stay relatively
          stable over a period of time. During this trend, there is not much significant movement in
          stock prices, and they tend to trade within a narrow range. Investors might notice that
          the overall direction of the market is neither rising nor falling sharply. It&apos;s like a
          temporary pause in the market, where buyers and sellers are in a balance, resulting in
          little overall change in stock prices.
        </p>
        <p>
          In a sideways trend, investors may feel unsure about the market&apos;s next move, as there is
          no clear indication of an upward or downward trend. This uncertainty can lead to lower
          trading volumes, as people may choose to wait for a clearer market direction before making
          significant investment decisions. During this time, traders might look for short-term
          opportunities, aiming to buy at the lower end of the range and sell at the higher end.
          However, investors should be cautious and avoid making impulsive decisions, as sideways
          trends can sometimes transition into more decisive upward or downward trends.
        </p>
        <Image src={sidewaystrend} width={500} height={500} alt="Upwards Trend" className='learn-img'/>
      </div>
    </>
  );
};
export default LearnMode;

// /src/app/images/upwardstrend.png
// src/app/images/upwardstrend.png
