export default `
SELECT DATE(DATE_PART('year',session_startdt)||'-'||date_part('month',session_startdt)||'-'||date_part('day','2018-05-01')) AS group, SUM(session_avg_bet)/sum(timeplayed) AS avg,
CASE when cardtype='JKT WHITE' then 'SILVER' else cardtype end as card_type
FROM genting.genting_gaming_master_ctt
WHERE  session_startdt >=  DATE(DATE_PART('year','2018-05-01')-1||'-'||date_part('month','2018-05-01')||'-'||date_part('day','2018-05-01'))
AND    session_startdt <= '2018-05-31'
AND   DATE_PART('day',session_startdt) >= DATE_PART('day','2018-05-01')
AND   DATE_PART('day',session_startdt) <= DATE_PART('day','2018-05-31')
GROUP BY
          CASE when cardtype='JKT WHITE' then 'SILVER' else cardtype end,
          DATE_PART('year',session_startdt) || '-' ||date_part('month',session_startdt)
          having sum(timeplayed)>0
`;