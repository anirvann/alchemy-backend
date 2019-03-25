export default `
SELECT  trading_date AS group, count(custid) AS sum, card_type
FROM genting.business_review_v2
WHERE trading_date LIKE '2018-%'
GROUP BY trading_date, card_type
`;
