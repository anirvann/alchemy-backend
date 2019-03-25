export default `
    SELECT  monyr AS group, SUM(fnb_spent) AS sum, card_type
    FROM (
    select to_char(trading_date,'MM') as mon,extract(year from trading_date) as yr, concat(yr, mon) as monyr,  fnb_spent, card_type from genting.business_fnb_v1
    WHERE fnb_spent > 0 AND trading_date LIKE '2018-%'
    )
    GROUP BY monyr, card_type
    order by monyr
`;