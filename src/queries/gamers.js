export default `
    SELECT  monyr AS group, count(custid) AS sum, card_type
    FROM (
    select to_char(trading_date,'MM') as mon,extract(year from trading_date) as yr, concat(yr, mon) as monyr,  custid, card_type from genting.business_review_v2
    WHERE trading_date LIKE '2018-%'
    )
    GROUP BY monyr, card_type
    order by monyr
`;
