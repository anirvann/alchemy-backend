export default `
SELECT to_char(trading_date, 'YYYY-MM-DD') AS group, SUM(twin), game_type, card_type
FROM genting.business_review_twin_v1
WHERE twin > 0 AND trading_date LIKE '2018-%'
GROUP BY game_type, trading_date, card_type
`;