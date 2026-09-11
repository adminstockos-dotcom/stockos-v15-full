"use client";
import { useState, useMemo, useEffect } from "react";

const LOGO = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIbGNtcwIQAABtbnRyUkdCIFhZWiAH4gADABQACQAOAB1hY3NwTVNGVAAAAABzYXdzY3RybAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWhhbmSdkQA9QICwPUB0LIGepSKOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAABxjcHJ0AAABDAAAAAx3dHB0AAABGAAAABRyWFlaAAABLAAAABRnWFlaAAABQAAAABRiWFlaAAABVAAAABRyVFJDAAABaAAAAGBnVFJDAAABaAAAAGBiVFJDAAABaAAAAGBkZXNjAAAAAAAAAAV1UkdCAAAAAAAAAAAAAAAAdGV4dAAAAABDQzAAWFlaIAAAAAAAAPNUAAEAAAABFslYWVogAAAAAAAAb6AAADjyAAADj1hZWiAAAAAAAABilgAAt4kAABjaWFlaIAAAAAAAACSgAAAPhQAAtsRjdXJ2AAAAAAAAACoAAAB8APgBnAJ1A4MEyQZOCBIKGAxiDvQRzxT2GGocLiBDJKwpai5+M+s5sz/WRldNNlR2XBdkHWyGdVZ+jYgskjacq6eMstu+mcrH12Xkd/H5////2wBDAAkGBwgHBgkICAgKCgkLDhcPDg0NDhwUFREXIh4jIyEeICAlKjUtJScyKCAgLj8vMjc5PDw8JC1CRkE6RjU7PDn/2wBDAQoKCg4MDhsPDxs5JiAmOTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTn/wAARCAGOAnIDASIAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAYHBAUIAwIB/8QAURAAAQMDAQQHAwgECggFBQAAAAECAwQFEQYHEiExE0FRYXGBkRQioRUjMkJSsbLBNmJ00QgWFyQzNHJzkpNDU1RVgqLS4SUmREXwNWOUwvH/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/xAAkEQEBAAICAgICAwEBAAAAAAAAAQIRAyESMTJBE1EEIkJhBf/aAAwDAQACEQMRAD8AvEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGDd7tS2im6apeqIvBrU5uXuNPb9a2+sqWwPjlg31w1z8Y8ytykuqyz5+PDKY5ZaqTAAs1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0OrNWWrS1Es9fMiyr/AEcDFRZJPBOzvEmxvVVGoqqqIic1UhOp9qGn7C5YWSOuFSnBY6ZUVG+LuSfEq276o1XtDr/YLdDKymzwp6fKNRO17uv7iYaZ2MUkDWTX6qdUS81ggXdZ4KvNfLBr4TH5KeVvxR+4bW9S3aZ1PZ6KOn3uDUjjWWRE/f5FnbNp9Q1GnUfqRr0q+lduLI3derOGN5PHJvrbabdaokioKKnpmImPm40b8eszSuWUvqJks91CdpFLPI2kqGtV0MaOa7H1VXHEhVHBJU1MUULVdI5yIiImS6XsbIxWPajmrzRUyinhT0FHTPV8FNDG5eatYiKc+XF5Zbed/I/86c3LOTyesDXMgjY5cua1EVe/BS2ptSbQrDqCuqFZMtA2RUjToN+Hc6sLjsLtPxyI5FRyIqLwVFNsbp6Nm50p2ybbW8GXm2Ljl0tKuf8AlVfzLPseobVfoEmttbFPwyrEX32+Kc0NVqPZ/p3UDPn6FlPNzSamRI3+eEwvmVTqPZtqDScq3Ky1MtTCxc79Pls0adqonNPA01hl66V3lj77X+Cn9E7XukljoNRs3XKu6lW1MIi/rp1eKFuwyxzxNlie2SNyZa5q5RU8SmWNx9rzKX0+wAVSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARnX2rabSdmfUOcx1bIitpoV+s7tXuTmpMmy3TB2h69pdJUyQRI2e5ytVY4upne7s7k68FW6S0fedoNwfdbtVTMo9735353pP1WdXDt6j20BpKu11d5L3e5JJKJr/AH3uXjM77KdyF+U8EVNCyGCNkUTEw1jEwiJ3IaWzDqe2cnl3fTEs1mt9komUlupo4ImIie61Mu71XrUzwDJoAAAAAAAAAACAa82Z2/UTX1dAjKO4onNqYZL/AGkTr70K60hrG76BujrPd4JVo0fiSGRF3ov1mdy8+xToQiuvdF0Wrbc5HNbHcI2r0E/LC9ju1DTHP6y9KZY/cSK31tNcaOKro5mTQSplr2LlFMg5+0Fqi4aEv77FeGOZROk3ZWPzmFy/Xb3Lw8UOgGOa9qPaqOa5MoqclQrlj41OOW36ACqwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADyqqiKlppaid6MiiYr3uXkjUTKqc71s9btP19HHFvspVdusRf9DCi8V8V+8sPbjf3W7T0drgfiavcqPwvFI05+q4T1PXYpp1LVpr5SmYiVVwXfyvNsafRTz4r5oa4/wBcfJnl/a6Tu126ltNBDQ0UTYqeFu6xqGUAZNAA/FVETKrhEA/TS3nVdisjnMuFzp4ZWplY97ef6JxKs2i7U6iWoltmnplhgYu7JVN+k9etG9id5U8sj5pHSyvc+Ry5c5y5VVNsOG5d1llySdR0BU7ZNMRLiJtbN3tiRE+KmJ/LZY97HydX47fc/wCoogGv4cVPy5Og6bbHpiVUSVtbD/aiyieikns+sdPXncSiutM+R2MRuduvz2YU5VCKqLlFwpF4J9JnLXY4KX2J3zUNxu0tFNWPqbbBFvPSZVcrF5NRq+P3F0HPlj43TbG7mwAFUq12x6Obd7Y69UUae3UbMyIicZY0+9U5nlsV1e66W51krZM1VI3MLnLxkj7PFPuwWcqI5FRURUXgqKc7aign2d7Rm1dJErabf6aFF5Ojd9Jv3p5Ia4/2nizy/rdx0UDxo6mKspIamF29FMxHsXtRUyh7GTQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADyq6mCjppKmplZDDGm8971wjUArHXOz28ak1tT3BKiF1sVI2uRz+MTW/SRE688fUtCKNkMTI42oxjERrWomEREMCx322X+mdUWusjqY2ruu3eCtXvReKGyJtvqoknsABCQge2W+SWjSToIJHRz1z0ha5q4VG83cfh5k8Ki/hCIvsVmX6vSSJ54QvxzeUVzusapU9qKknr6qKlpYnSzyuRrGNTKqqniTHZFVUtJrqhkqpGsY5Hsa5y8EcrVROPwOzK6m45cZu6qaWLYm3omvvVyd0i846ZOCd28qfkbv+RnTW7jprhnt6Vv/AEljg47yZX7dXhj+lSXPYjRvY5bddpo39TZ2I5PVMFfao2fX/Taq+em9ppU/9RTormp4pzTzOnD8ciORUciKi8FResmcuURePGoJsbsLbRpKOqexUqa9emeqpx3eTU9OPmTw/GtaxqNa1GtRMIiJhEP0pbu7Wk1NAAISFa7dLN7bpqG5MROkoZMu72O4L8cFg01woqqWSGnq4JpIvpsjkRyt8UTkY+o7Yy8WKut0n0aiFzM9i44L64JxurtFm5pENil6bctINo3O+et71ici/ZXKtX7/AELAKK2C1qUuo7hb3rurUQZRF63MX9yqXqW5JrJGF3AGLJcaGKsZRSVlOyqk+hC6REe7wTmZRRYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABVwmV5FCbXddJeql1ltzl9gp3/OyIvCZyfkikq2wa5S20q2S11H8+l4TvYvGJv2fFfuIR/EeS3bOLjqG4x4q5mxLTsVOMbFkblVTtXPobceMn9smedt6jS6C1XPpO9x1TcvpJcMqIs/Sb2+KdR0zbq6mudFDW0crZaeZu8x7eSoUHoLSUWq9H3qNjWtuEErX0717cL7q9y8jM2XavqNLXV+nr0j4qR8itTpcotPJ+SL/wByeSTK2z2rhbJ2vkAGDYITtcsEt90nJ7LEstVSPSaNrU4uTk5E8uPkTYEy6u0WbmnHHFFwoRcKiouFQuzaBsoWsnkuWnkY2aRd6Wlcu61V7Wr1eClO3G3VtrqFp66llppk+pI1UX/udmGcyjlyxuKW6d2pajskaQulZXwJybVZc5qdzkVF9SdWrbZbpWolytlRTv63QuSRvxwpRwIvFjUzkyjqC0bQNL3Vrehu0ET3co6hejd8eBJmuRzUc1UVqplFTkpxySLTmtr9p57PYq57oG8OglXfjVPBeXlgzy4P00nL+3UoInoTXNBq6l3WJ0FfG1FmgVfi1etCWGFlnVay7D8cmUVO0/QQlzvfrdddmesYq6nkfLSyPV8cjso2Zv1mO7/+yl66cvlHqG0w3Giejo5E95ueLHdaL3nlqrT1HqazzW+sYnvIqxyY96N3U5Cj9I324bONUzW25telG5+7UR8+HVI3/wCcUNfnP+s/hf8Aj70B/MdraxImESonix3e8hc+tNT0ulLM+unVr5Xe7BDnCyP7PAo+23ehpNqst2kqGpQtqpJek55aqLg+qme77U9ZJBEro6VqqrEXiyni+0qdq8PMvljuy1XHLU1Gw2e2W6601c7UlfI5kFPOkr5OPvOzlGN7k4eCF+GBYrRSWK1U9uomIyGFuO9y9ar3qZ5jll5VpjNQABVYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACO691E7TGm57jHF0kuUjjTqRy8lXuJEec8ENTEsU8UcsbubHtRyL5KIKK2XaOn1Nd5NQXtj5aNHq9OlzmokVefeidfkWjtLpFq9B3eCNuVSFHoiJ9lyO/IksMUcETYoY2RxsTDWMRERE7kQ862BKminp1RFSWNzOPemC9z3dqzHU0qT+D1KnR3qLPHeidj/ABIZ+2HQq3SJ1+tseauJn84jYnGVqfWTvRPgRbYrVutuuKq2ycPaI3x8ftMXKfcpfi8UwpbO3HPcVxm8dVW+xXVFVfLPUW+sV0ktv3EbMq53muzhFXtTHpgsg8KajpaRHJTU0MCPXLujYjd5e1cHuZ27u15NQACrhMryISGHcrVb7rF0VwooKpnUkrEdjw7Dys19tl7ifJbquOdGOVr2tX3mqi44p1GxHoQG6bI9MVznPgjqKJy8uhf7qeS5IVedil0gcr7VcIKqPnuTIsb/AAzxRfgXmC85Mp9q3DGuSr3YLrYZ+hudHLTuX6KuT3XeC8lNadY6ptVFeLDWUldG18KxudlebFRMoqL1HJ7kw5cckU6ePPznbDkw8Wx05eqrT95p7lSL85C7KtzwcnWi9ynWNNOyppop41zHKxHtXtRUyhx51nWWlEcmmLSj/pexxZ/wIZ889VfiragA52wQfajoluqLX7RSRtS6UyZjdy6RvW1V+4nAJl1dxFm+nINLb6yruDLfDTyPq3P6NIkT3t7OMHS2gNI02k7MyFGsdXStRamZE4uXsRexDbw2K1Q3V90it9OyvkTDp0Ym8vbxNiaZ8ly6VwwmIADJcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAc+azZLpLaslya1WwvqGVTVRODmu+mn4joCCWOeFk0T0fHI1HNci5RUUrrbdp5bnp1lzhaqz29d5yInONefpwX1P3YpqRlz098kzPT2ug91qKvF0a8l8lynoa5f2xlUnWWljgAyXCHbVr8ti0hUrDJuVVV8xEqLxTP0lTwTJMSv9q2irhquClmoKlm/So7FO/gj881Re3h1lsdb7RlvXSgrdcq62VKVNDVS00ycnxuVq+faWXY9tVxp0ZHdqCKqanOSJdx6+XIre62i42ep9nuNHNSy9SSMVM+C9fkYR13HHJzTLLFf9Ptm03IidLBXxL1/Ntdj0U9JNsel2plra969iQon3qc+Ap+DFb8uSy9dbVp77QyW210z6SllTEkj3fOPTsTHJO0rQGbaLRcL1VpS26klqZl6o25wnaq9SeJpJMIpbcq9dOWaov8AeqW2UyfOTvwrvst618kydZQRMggjhjTDI2o1qdiImCF7NtBRaSpn1FS9s1ynaiSOTi2NPst/Mm5zcuflenRx4+MAAZLhAdrurqrTFppordK2Otq3qiPwiqxic1wviiE9e5rGq5yo1rUyqryRDnW9TT7R9oiU9K93szndFEq8UZE3m7z4r5oXwm72pndTpdmg7jX3bSdurrlhaqZiucqNxvJlcLjvTBvzypaeOlpoqeFu7HExGNTsREwh6lFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHnUQR1NPJBMxHxStVj2ryVFTCoc7XalrNmOvI5qbedTIu/EruUsS82r3808kOjSN670pTarsslK9rG1bEV1PMqcWO7PBeSl8MtXv0rlN+m3s10pL1bYLhRSdJBM3LV607l7zNOe9DaquGgL5LZ7zHIyjdJiaNeKxO+23u5Z7UL/pamCsp46imlZLDIm8x7FyjkGePjTHLb1ABRZjV1BR3CLoq2lhqY/sysRyfEiFz2U6Vr5HSNpZqVy/6iVUT0XKE4BMtnpFkvtVVVsQtLv6rdq2L+8Y1/wB2Dxi2HUSPRZr5UOZ1oyBGr65UtsFvyZftHhj+lfUGx/S9K5rpUrKpUXOJZURPRqITS12m32mHobfRQUzOtI2ImfFeszQVuVvtMknoABCQAiG0LW9JpO3Pa1zZbnK1egh54/Wd2J95Mm+oi3SP7ZtZfJlA6xUMie2VTPn1ReMca9Xiv3HrsZ0i60WtbxWMxWVrU6Nqpxjj6vNefhghezjSdbrK9Ov15V8lEyXfe6TP84f9lO5Osv1ERERETCJyQ0yvjPGKYzd8q/QAZNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ3aDoKj1bTdNHuwXOJuIpuSO7ndqfcVVpfV182e3J1pulPI6ka736d/Nn6zF5fkp0OaLVelLVqmiWnr4U6RP6OdiIkka9y9ncaY59avpTLH7ntl2K+W6/0TKu3VLJo3IiqiL7zO5ydSmyOd7xpTVWz+u9vt00r6fe4VFNnGOyRv7+BLNN7aKeRGQ36jdC/ks8CZavereaeWReP7x7Jn9VbgMC13q13eJslvr6epa5M/NvRVTxTmhnma4AAAB+Pc1jVc9yNaiZVVXCIB+giWo9ounLCxUfWNq6jkkNMqPXzXknmpVOodompNYS/JtoppaeF7sJHTbyyvT9ZU6vDBfHC1W5SJ/r7afQ2Br6K2KysuKp9JqoscXivWvcQPRmjbtru6OvV8nm9iV2XyvzvzY+q3sROWfQkeiNkTaeSOu1G5skjV3m0jFy3P669fghbccbIo2xxsaxjUwjWphEQtcpj1irJcu68qGiprfSR0lHAyCniTDI2JhEQ9wDJoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/FRFRUVMovUpDNT7MtO393S9A6hqc5WSmw3e8W8l+BNATLZ6RZL7UTcdkGoLZI6ez10VRu/R3XLFJ+74mJFX7ULAq70V2fG3ivSQrUM9cLg6BBf8l+4r4T6UMzbHqiBd2e3UDlT7UT2r+I9Hbar85MMtVAi+D1/MvGSCGVMSRRvT9ZqKeUdvoo1R0dHTsVOOWxNT8h5Y/o8cv2ox+0bXt7asduolYvbR0bnr6rvYMdmk9ompHbteta2Nea1k261P+HP5HQaNRvJETwP0fk16h4b91UFj2JQsVH3m5uk/+1SphP8AEv7izbNYrXY4EhttFDTtxhVa33neK81NkCtyuXtaYyegAFUgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADyqamCkhdNUzRwxN5vkcjUTzUity2l6Ttz1jfdGzPTqgYsnxTgTJb6RbIl4IFHtd0k9266oqo07XU7sfDJI7XqywXXdSiu1JK9cYZ0iNdx7l4i42EsrdA+JZGQxPlkcjY2NVznLyRE5qaD+Pelf9/UP+YNbTtIgR3+PWlf9/UP+YF11pVP/AH6h/wAweNRuJECOprvSq/8Av1D/AJg/j1pX/f1D/mDxpuJEDFttxorrStqqCpjqadyqiSRrlFVDKISAxbhcqG2xdLXVcFNHz3pXo3PqRKt2raSpJXRpXSzqnXDC5yevWTJb6RbIm4ITQ7VNJVkiR+3yQKvXNE5qevIllBcaK5RdLQ1cFSzrdE9HY9BZZ7JZWUACEgB+OVGtVzlRETiqr1AfoI3dtd6ZtOUqbtTq9PqRL0jvRuTSpte0kr93pqtE+17OuP3lvG36R5RPgaCz6005eUT2K7U7nr/o5Hbj/R2FN+Vs0kB+OcjGq5y4aiZVV6iPfx60r/v6h/zBrZtIgYdrutBd6Zam3VUVTCjt1XxrlM9nxMwAAaCfWumaeZ8Mt8oWyMXDm9KnBRrY34NPbNUWK7VKU1vulNUzqiruRvyuENwAB8SyxwxuklkbGxvFXOXCJ5kfr9d6XoFc2e80u83m1jt9fhka2bSMEXodoWlK1yNivNO1yqiIkuY/vRCRUtVT1cXS008U0a/Wjejk9UJssNvYAEAAa65X202rPt9xpaZU47skiIvpzA2IImu0nSKS9H8sxZzjO47Hrg3MV0prvaJ6mz1cVSm65rHxOzh2OXiTZYjcZ7ZonSLG2RivTm1HJlPI9Co7T8ofLUXRdL7T0nvKuc8+OS20zhM8zPDLyc38X+T+eW61p+gAu6gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADXagu9PYrPVXKqX5uBiuxni5epE8VNiVtt5lezR9Oxud2SsYjvJr1T4ohOM3dIyuptT+rdWXPVFwkqKud7YFX5una5dxidXDt7zT0tJU1kiR0tPLO9fqxsVy/A8eHDidTaFtNstmmqBLa2JzJIWvdM1EzIqplVVfE6s8pxyac+GPne3Nkunr1CxXy2quY1Ot0D0T7jWrvRv62ORfBUOxiP6j0ZYtRQLHW0MaSZyk0SIyRF8U5+ZSc/7i94v1Ud0HS3CDZpUT3CsnqH1NNJJE2Vyu6Nm4u6iZ9fM573HfZX0OwoYIoKdlPGxrYo2IxrETgjUTCIePydQ/wCx0/8AlN/cUw5PG1bLj3pyGrXJ9VfQ/DqjVlBRN0vd3JSQI5KOVUVI0RUXcU5WOjjz82OeHi/Ua5U4Iq+B+7rvsr6F8bDKSmm0jM+anikd7W/i5iKv0W9pYvydQ/7HT/5Tf3GeXNq60vOLc3tDNiiKmhYEVMfPSfkee0naJFphnsNv6Oe6PTii8Wwp2qnb3Eo1LdqXTGnqu4uYxkcDPcY1ERFcvBEx4qcr19XNcK2esqXq+aZ6ve5eaqpTDDzttWzy8ZqPS53SuutS+pr6qWolcuVdI5V9O4x44pZlxFG+RexrVUsHZds+TUj1uVyR7LbE7DWpwWdyc0/s9voXvb7Vb7ZEkVDRQU7ETGI2In/9NMuWY9SKY8dy7rkiSGWFcSxPjXsc1UMi1XWutFUyqt9VLTytXKKx2M+Pah1fcLXQXKJ0VdRwVDHJhUkYi8ChNqGz9dMStr7f0klsldhUXisLupFXsXqGPLMrqmXHce4svZxtDg1U32GrYkF0jZvK1Poyp1q380J4cg2yuqLZXwVtLI6OeF6Oa5q4Xh1efI6r03do77YqK6RJhtTEjlTsXkqeqKZcuHjemnHn5Tt63q60dkts9wrpejp4W5cvNV7EROtVOdtbbQbrqepcyOWSkt6ZRkEblTeTtfjmpvtuGpZK69NscLlSmouMmF+nIqfknDxVSvbNbKq83Ont9GzfnnejW9id693WaceEk8qpyZ23xjDxle890oqtWb6Us6t7ejXB0jpDZ7ZdOUqb0EdZWOwr55mI7C9jUXkhLUYxG7iMajcYxjgLz/qE4v3XHXFrutFQsbZ3tLrbLUR2+6SS1dveqNaq5dJF4dqdxaOsdntm1JSuVsEdHWtTLJ4mImV7HInNDT7OdmcWnpVuN26Kor0ykbU4siTt71+4jLkxyx7TMMsb0sCsVHUE7k5LE5U9Dj87Brv6lUf3bvuOPxwfZzfToHYT+hkv7W/8LSxiuNhH6Gy/tb/wtG1TX7LDTPtNukR1zmbh72r/AEDV6/7XZ6mWUtzsi8usd1rtrW0NKJk1gtEmal7d2onYv9Gi/VRU+t9xTVtt9Zdq+KjooXz1MzsNa3mq9v8A3PKGKetqmxRMfNPM/DWtTLnuX71Oi9muhYdKUK1FTuy3OdEWR+MpGn2W/mb3XFjr7ZTfJd/TN0Doyk0lbd1EbLXzIizz45r9lOxEMzWWqqHSdqWsq/fkeu7DC1fekd+7tU3yqiJleCIU5YIV2ibRKy6VjVfabYu7DE7ix6ouGp54Vy+Rzzu7ra9dR92/Tmo9or23W/1stBbHr81SR5RVb1KiLw815k0tOzjStsiRiWqKpenOSqTpHL68PgStqI1qNaiIiJhETqP0XKpmMRm4aA0rXxKySy0saqiojoG9E5O/3cEIuugb5pB/yro64VErY/eko3rlXp4cneBboEysLjET0Fral1XSvjez2e5QJ8/Tr97c9X3EsKk2l2yXSV/otZ2hm7mXcqok4MVVTmuPtJlF78Fp26rjuFBTVsK5iqImyN8FTIyn3CX6qF7UNV1Nop6ez2hd67167rN36TGquMp3r1eZg6e2TW9jW1eoppblXP4vasioxF7O1fU1mo8R7dbM+o4ROjYjFdyzuvRP+bBbpN6k0id3to2aO0yxm4lhtu7307V/IybPYLZZHT/JlK2mbOqK9jFXcynWick8jZgptbT4SKNr1ekbUevNyJxU+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARjaPp9+pdK1NFAmalipNCna9ueHmiqhJwTLq7LNuPaqmmpKiSnqYnxTRuVr2PTCtVO1Ddae1nf9OtSO3V72QJx6F6b7PReXkdCao0PYtTIr62l3Klf/AFEXuv8ANevzKzvWxS4RSudabjDPD1MnRWPTzTgvwOmcuOU1k57x5Y94vuzbba1jkZd7ZDKzPF9MqsX0VVLC09tD03fnpFBW9BOq4SKpTo3O8OpfUoS96I1HY0e+stk3QsTKyxpvsRPFORHmuwqKi8U4oovFhl3CcmU9uxwVhsY1jV3uCe0XKXpailjR8MjvpOZnC7y9aoqp6lnnNlLLqt5dzbUav/RS8fscv4FOTuo6x1h+il4/Y5fwKcnnRweqx5vcX/sH/Q6f9rf+FpZBW+wb9Dp/2x/4WlkGOfyrXD4xWW3ur6LS1HTIqp09Wir3o1q/mqFDNTecjU5quC+dvlKsul6KpRFXoatGr4Oav5ohQzXbrkXsXJ0cPxY8vydZ6YoIrXp630UKYZFA1PNUyq+qqbM12nK2K42G31kLt6OWBjkXy4/E2Jy10BptYW+O6aXudHImUfA5U7lRMp8UNyarVVdFbtN3KrmXDI6d/qqYT4qJ7RXJrkwqp2cC+9g1xfU6WqqN6qqUlQu6vc5M49cr5lCrxVVXrL52C0DoNMVdW5FT2moVG96NTGfVV9Dq5vi5+L5KW1JVvrtQXGpkXL5Kh6qvmpZH8H+2QzXC53ORqLLTsZHHn6u9nK+jUK21HSvor/caaVMPjqJEX/EpZn8H64xR1t1tz1RJJmslZ37uUX8SDk+HRh8+11gA5HSAADwrv6lUf3bvuOPjsGt/qVR/du+44+Ojg+2PL9LD0trtul9CT0NGqOuc9Q5Y+HCJqoiby9/DgQConlqZ3zzyOklkVXPe5cqqr1qp8Ma5zka1Fc5eCInNTMutqr7PUpT3Cmkp5nMR6NenHCpwU2mMlZW2xc+xTS1ujtLL+90VTWyuVrFTikCJwx/a7fItQ5s2Za0l0tdmwVDlW2VTkSZq5XcXqcn59x0jFIyaJksbkex6I5rkXKKi8lOXlxsy7dHHZZ00muq2S3aQu1VEuJGU7kavYq8PzNFsYo2UuhqaVETfqXvkcvWvHCfcbzXdG+v0fdqaJMvdTuVE7ccfyNNscqmVGhKNjV96B743J2LvKv3KV/yn/SbgAqsAACObRKJK/RV2h3UVUgV7c9St4/ka7Y/UuqdBW/fcquiV8fHsRy4+CobTaBWpQaMu864/q7mJntd7v5mp2NwOh0FRK7h0r5Hp4byp+Rb/ACr/AKeu0jR7tT2+KaiekN0pF3oJFXGf1VX7u8jFo2mXKwuS3aztlTFM3g2oZHjeTvTkvihbBjV1BR3CHoa2lhqI/sysRyfES/VLPuNPa9b6auiMSmu9Mj3YxHI/cdnswv5EgRUVEVFRUXkqEHu+ynS1xVXMpZKN+OdO/CeOFyhGqnR2tNIqtRpy8yV1JH73s0i+9hOrdXKL5YJ1L6puz3FvAh+z7XEGq4JKeaP2e6UyfPw4VE54yme/q6iYFbNLS7AAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGHd7hDabZU3CoXEVPGr3d+OozCAbaYLrVaTbBbqaSaJZkdU9HxcjERccOzPPwJk3dIt1G50xrqxakib7NVNhqF4LTzKjXovd2+RJjjr343/WY9q+CoptKXU9/pWo2C93GJicmtqHIieWTe8H6rKcv7dXyIxY3JJuqxUXe3uWOvJynrJKJuqboluSNKNJ3dGkf0UTu7s5Pis1Pfq2NY6q83CaNyYVj6hytXyya6kpZ6ydsFLDJNM9cNZG1VVfJC/Hx+HdVzz8uosLYPG92sZ3tRdxlG/eX/iadAEK2X6NdpS0vfVKjrhV7rpkTkxE5NRfMmpz8mUyy3G2E1NNPrD9FLx+xy/gU5P6jrDWH6J3j9jl/Apyh1G3B9sub6dAbCP0Om/a3/c0scrfYP8AodP+1v8AwtLIMeT5Vrh8Y0+rrHFqLT9XbJMIsrcsX7L04ovqcq1lNNR1UtLPG6OaF6se1eCoqdR2EVvtO2cpqHeulqaxlyanzjF4JOid/wBotxZ+N1VOTDym4ieyTaDFaGNsd3l3KNV/m8y8olVeKKvYXhTzw1MTZoJWSxO4texyORfNDkKspKihqH09VBJBMxcOZI1Wqh7Ud1uVC3dpK+qp29kUzmp8FQ0y4Zl3FceSzqutqmohpYXTVE0cMTeLnyORqJ5qUbta2gQ3tvyNaJVdQsdmeVE4SqnJE/VK6rLpcK7CVddU1GP9bK5/3qedHR1NdUMp6SCSomeuGsjarlUnHimPdRlyXLqPmjppqyrhpadjpJpXoxjGpxVTqzSlnbYdO0NsaqKsEeHL2uXi5fVVIfsx2dJpxW3W5br7k9mGsTikKLz8yxjLlz8rqNOPDxnagdt2nJbdqD5Yiai0lf8ASVPqyImF9UwvqQfT14qbDd6a5UioksLs4Xk5OtF7lOpr7Z6O/Wua3V0e/BKmO9q9Sp2Kc3610Rc9K1zmyRvnol4x1LGruqnY7sXuNOPOWeNU5MbL5R0BpXWNo1PSskoqhrZ1T36eRUSRq+HX4oSA45ikfE9HxPcxycnNXCobH+MV73Nz5Yr9zs9pf+8i8H6qZzfuOldV6wtGl6V0lbO10/1KeNUWRy9XDqTvU0ez3aNS6pVaKraymuSKqtYnBsrf1e9E5oc7SSSSvV8sjnvXm5zsqpONnegLlqGsjrJemorfGqO6fCtc/uZ+8Xixxx7pOS29Ohq7+pVH9277jj5DsCrbu0EzUVVxE5Mrz5HH/WOD7RzfS3tiWkaGuikv1a3ppIZdyCNfotVE4uVOtePAnu0XRsGrLQ5GNa24wNVaeReHH7K9ymk2Don8Tpl6/anJ/wArSyDPPK+W2mMni4+rKSehqpaapidFNE5WvY5MKioW5sa1yqKzTtzm4YxSSOXl+oqr8PQ3G1/QvyzTPvdvYnt1PGvSxtTjMxP/ANkKGa5zHZRVa5F4Ki4VFN5Zy4su+PJ2K5EcioqZReCopUGj6h2hNf3DT9fIsdurnb9K93BqKq5b8MtXvRCR7Ktbt1LbvYat+LnSsTfVV/pW8t5O/tNvrzSFNq61JTvckNXCu/BPjO6vYvcpz/G6rb3NxJgVHZdc3XRcjbHq+jnfHCqMirWe9vN6l/WT4lhUGrNP3CFJaa70bmr1OlRqp5LxK3GxMu26BqKvU9ho41kqLxQsaiZ/pmqvoi5IFfNplVeZHWvRlDUVVS/3VqVZhGp2onV4rgTG0tkfG1i7yX6vo9GWd3S1UsqOqcfRbjiiKvqq+BZlooIrXa6SghREjpomxtx14TGSK7PNCs0yySurZfabvUp87Kq7yM61Rqr29ak1Jyv1ESfdAVxqy8ao0nqSa79AtwsE6NasMecw4Tivcuc8eSm7sG0TTV7ha5leyllXgsNUqRuT14L6keN1tO4lgMH5Zte7vfKVHu9vTt/eR3Uu0bT1jgXdq2VtSvBkNO5H5XvVOCIJLS2RE2wst+3hkdGnRtqIlfK1vJVViqufNEUtwrLZpZLncL7V6yvUfRy1TVbTxKiorWr14XkmEwhZpOftGIACqwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0N70bp6+I7261wOkdzlYm4/8AxNwpE5ti+nHvV0dVcI0X6vSNVPwllAtMrPVRcZVaxbFtONeiyVVwkRF+j0jURfRpNLHpqzWCNGWy3w064wr0TL3eLl4qbYC5W+yYyegAFUvCupYa6jnpKhquhnYsb0RcZaqYXiQ3+SXR/wDsM/8A+Q/95OQTLZ6RZK1WnNP27TdC6itkTo4HPV6o56uXK96+BtQCEgAA1d609aL5EsdyoIKhFTG85uHJ4OTihC6jYxpuSRzop6+FF+qkjVRPVMlkAmZWekWS+1cU2xnTUUrXyz187U5sdKjUXxwiL8Sa2iw2qyxJHbaCCmRExljfeXxXmpsgLlb7JJPQACEh8TRRzxuimjZJG7grXplF8j7AEKvWy3S11esiUj6ORea0rtxF/wCFUVPgaf8AkV0/n+vXHHZvM/6SzQWmeU+1fGIfYtmmmLK5JGUS1Uyf6SqXpFTwTl8CXMY1jEYxqNa1MIiJhEQ+gRbb7TJp8yMbJG5jky1yKi+BCP5JtH5VfYZ/D2l+PvJyBLZ6LJfbVad0/btN0LqK2ROigc9Xq1z1dxXx8DagEJCHV2zHSddWS1Utuckkrlc7o5ntblexEXCExBMtnpFm0RtGznTdmuEVfQ09RFURLlrvaH+nPihLgBbb7TJpj1tFS18Kw1lNFURLzbIxHJ8SH3LZTpOvlWRKSWlcvP2eVWp6LlE8icAS2ekWSoHRbI9J0siPkpqipVFyiTTLj0bjPmTC3WugtcXRUFHBTM7ImI3PoZgFtvskkAAQl+Oajmq1yIrVTCovJSM3jZ/pe8Krqm1QskX68GYl/wCXGfMk4Jl0aV0uxrTG9npbgifZ6ZuPwm+smgNM2VyPpbXG+VOKSTqsjkXu3uXkScE3K37R4wABVIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeNbUNpKOepemWwxueqduEyB7Ai1F/Ga6UzK1tdS0ccrUfFEkW/lF5ZVeRvLSlySmcl0WnWdHrurBndVuExz685AzQfjnI1qucqI1Eyqr1Gks+oaWs9pSeqpmOZUPjiTfRFcxF91eK9YG8APiaWOCN0k0jY4283OXCIB9gxqW4UVW9WU1XBM5EyqMeiqZIAH45zWNVznI1qcVVVwiGHFd7bLMkMdfTPkVcI1siKqqBmgGi1DX1NHcrNDBLuR1FRuSphPeTgBvQeU9RDTo1ZpWRo5cIr3ImV7D1AAAADCvFxitVulrJUVyMTDWpzc5eCJ6mlp49U10KVTqulolcmWU/Rb3D9ZV5AScGjsl4qZq2a2XSKOKviTeTo/oyN7UybwADylqIYnIySaNjlRXIjnInBOanlTXGiq5Fjp6uCV6JlWseiqBlAHy97Y2K97ka1qZVVXCIgH0DDgulvqZUigraeSReTWyIqqZgAHnPPFTxrJNKyNiLjeeuEPJtfRvqfZW1ULqj/Vo9Fd6AZIBiVNzoKWRY6itp4npza+REUDLB5wTxVEaSQyskYvJzHZQ9AANCmoYG6hnoJaimZTRwo5Hq/C7+cK3PI3cUsc0bZIntfG5Mo5q5RQPsGvvq1CWyVaWsipJeGJpVTdbx45M9ud1MrlcAfoPiaWOCNZJpGxxt5ucuEQx5bnQQzdDLW07JfsOkRF9AMsAAAYb7pb2TdC6up2youNxZEzkyIpopt7opGP3HK126ucKnNF7wPQAAACOXCuutZepLXapIYEgY1800jd5UzyREAkYNPboL9T1bW1lXS1VJxy5I1ZJy4cE4czcAAeaTwrOsCSsWZE3lZve8iduBPPDTtR00rI2qqNRXuRMr2AegB5VNTBSs6SomjiZnG89yNT4geoMWluNFWPVlNVwTPRMq1j0cqJ5GUABop9QRQakS3ST07KdKdXue53FJN7G6q5wnDibmCeKoiSWCRkka8nMXKKB6AGF8rW3pei9vpukzjd6VucgZoB8ve2NjnvcjWtTKqq4REA+gYct0t8O50tbTs303m70iJvJ2ofc9fR00bJJ6qGNj+LXOeiI7wAyQfEM0U8aSQyMkYvJzVyin2AAAAAAAAAAAAAAAAAAAA86iFlRBJBImY5Gq1ydqKmD0POobI+CRsL0jlVqox6pndXqXAEbgsl7tPuWq6Mlpm/RgqmquO5FTq9DP01eJbrDUMqYEhqqaTo5WtXKZ7UPP/wA0I3c/8KcuMb/vovjg9tOWiS1Q1DqidJqmpk6SVyJhM9iAbZURyKioiovBUXrI7piipHJcldTQqrK+ZGqsae6iLwRCRmipbfdbfWVS0slI+lqKhZlSVHI5u9z5Ab0i99T27VVqtsy5pNx0zo+p7kzjKdfIlBqL3aZKyelrqOVsVdSuzG56e65F5tXHUBqdaUsFvpaS40kTIKiCoYiLGm7lF5ouOaEtTkR2qtV0u9RTJc30sVLA9JFjgVzlkcnLOUTCEiAjWrWurK60Wpz3MgqpXOlVPrI1EXd88m7ZbaBm5uUVO3cVFbiJvBU5Y4GJqC0LdYIlil6Gqp39JDJ2L2L3H5At/wCkibMy3IxFTpHNc9VVOvCY5gbYiWuZ3U1ZZZ2xOldHUK5GN5uxjgS01F7tUtwrrXURvY1tJP0j0dnKpw5egGBp2Fl5el6rZWTTouI4U+hT92F+t3kmNJU2eeC6JcbXKyJ71/nEL89HKnbw5KbsAAAI7rVcUdC539G2sjV+eWOPMkRi3OghudDLRzoqxyJjKc0XqVPM1FLSajoKdtLDPQVMTEwyWffR6J1ZxnIHhclauvbWjcbyU797HZ72MkoNLZLNJR1M9fXTtqLhPwc9Ew1jfst7jdARq+0UVfqi0wzpmJIpXub1Oxjgvd+489YUkFBR01yo4o4KmmnZuujajd5FXCouOaH3f4KifUtrSlmSKZkUr2q5MtXGOC9y5PSptd0u9RTtua0sdHBJ0ixwuVyyOTlnKcgJCi5RF7SKa0qXe32qhWGaenme58sUX0pN3GG+HaSw1d9tPymyCSKXoaumf0kEuM4XsXuXCAR68Zrbe+Kk03V09S1UWKVsTWKxyLzyikwpHySUsL5mbkrmNV7exccUNXnUat3dy1tX7aOkX4Y/M3IEc18m9puZO2SP8SG2t1tpKKCFsMEaPY1E6TdTeXhxVV55U8NSW2W62p9JC9jHue12X8uC5Nm1MNROxAP0jlTcKOW41MNJZHV80bkbNK2Nm7vY5by81QkZH6e3Xa2VVb7AtHLT1Mzp0SZXNcxzufJOKAYuk3vZe7tT+yLRx4jkSDeRUYq5zjHDiSo0VktFZRXWtrqyojmdUsaiq1FTCp+RvQIvFSU0muKtj6eJzfY2v3VYipne5+JJo2MjYjI2NYxOCNamEQ01fbK9t6S526Sn33Q9DIyfOFTOUVFQ21N0/QM9p6Ppse90ed3PdkDSa8/Rer8WfiQ30f8ARt8ENdqS3S3azz0cL2MkkVuFfy4Ki/kbJqbrUTsTAGk1smdMVqdu5+Np+1ljt7LFPTpTRriFy9IrUV+9jOc885MrUFBJc7RPRxOax8m7hXcuDkX8jLqYlmpJYWqiOexWoq96YA1mj6mSr01QzSqrnqxWqqrzw5U/Iyr7UyUdmramL+kjic5vcuDz03bpbVZaahmex8kSOyrM4XLlXr8TYTxMnhfDK1HRyNVrkXrRQNJp6zUCWGmbLTwzumjR8j3sRVcruK8fM8NCxJBR3GFHK5I66RqKvXjB9UVvvVspFo6esolpI8pHLK12+xv3Lg+dBxdFbKpUc58b6uRzHu+unBM/ACSgAAaK72Konr/lG217qOrVqNd7u8x6JyyhvTU1rL6yrkfRSUUlO7G7HOjkVvbxQDBprld7fdKWhu7aaWKpy2OohynvJxwqKSQj8Vrulbdaasus1KkdLl0UMCKqby8MqqkgAjuomNt9yoL03eRGPSCoVOSxu4Iq+CnzcmrddVUVIiZgt6e0yr1K5fop8M+Ztb7FBPZ6yOpfuRLEu877OOKL6mp0HSSx2l1bUq91TWO3lc/nupwb/wDO8CSka1RSVPylQXBlGtfTU6OSSnTiqKv1kTrUkpr7h8rJOx1AlG6Ld95s6uRc56lQDBsl0tVZWuhholo65rVyySFGPVvcqc+o3xoqa119RfIrncXUzFgjVkUcGV581VVRDegReopqd+vWNfTxPa+gVyo5qKiu314+OCSxRRwsRkUbY2Jya1MIai6Wqrku9PdaCWFtRHGsLmTIu65uc9XibSj9p9nb7YkST8d7os7vPhjPHkBpdc1k1HYJOgVUdM9IlVOaIuc4MBXUy0C0iaUq0ase7noWZ5c855/EkV4t0V1t8tHNwbInB2OLV6lMCBuo4Imwqlum3UwkrnPaq+KY5geulfbG2Onjr43snjyzD+e6i8M+WDJvv/0S4fs0n4VMmkSdKeNKlzHT499WJhue4+LjTuq7fU0zVRrponMRV5IqoqAaPStoonabpenp4p3TRbz3SNRVVF6s9iJwMfRVuppLfO+eJtQ9k74WulTf3WNXgiZ5JzJFaqV1FbKSlerVfDE1iq3kqomDF09bZbXRywyvY9z53yIreWFXgBrdGtSCpvVGzhDBVr0bepEXqT0JMamzWuWgrrnPI9jm1c3SMRuconHmbYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADGkooZK6GscjumhY5jePDC4z9xkgAAAAAAAAAAAAAAAAAAAAAAAAAaOTS1tkc5F9pSJy5dCk7ujXyybingipoWQwRtjiYmGtamEQ9AAAAAAAAABr7nZqS6SRPqulc2P6iPVGu8U6zPY1rGo1qIjWphETqQ/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k=";

const BASE = 300000;
const BASE_MODS = [
  { id: "dash", name: "Dashboard Real", desc: "Ventas, stock y caja en vivo", func: ["Ventas hoy", "Stock bajo", "Caja", "Rentabilidad"], color: "#1ECB6A" },
  { id: "inv", name: "Inventario Maestro", desc: "Tallas, colores, fotos y bodega B1", func: ["Matriz tallas", "Fotos HD", "Bodega B1", "Stock real"], color: "#1ECB6A" },
  { id: "pos", name: "Facturación POS + DIAN", desc: "Factura electrónica en 1 clic", func: ["POS", "DIAN", "Ticket", "Cierre caja"], color: "#1ECB6A" },
  { id: "clientes", name: "Clientes y Cartera", desc: "Crédito, abonos, recordatorios WA", func: ["Clientes", "Cartera", "Abonos", "Recordatorio WA"], color: "#1ECB6A" },
  { id: "compras", name: "Compras Proveedores A/B/C", desc: "Unifica 3 excels con origen", func: ["Proveedor A/B/C", "Costo real", "Ganancia 40%/85%", "Importar Excel"], color: "#1ECB6A" },
  { id: "ventas", name: "Ventas y Cotizaciones", desc: "Cotiza, vende, despacha, guía", func: ["Cotización", "Pedido B1", "Guía", "Factura"], color: "#1ECB6A" },
  { id: "ganancia", name: "Reportes de Ganancia", desc: "40% mayor / 85% detal real", func: ["Mayor 40%", "Detal 85%", "Por proveedor", "Por ref"], color: "#1ECB6A" },
  { id: "link", name: "Link Maestro + WA Auto", desc: "stockos.com/inv + disparo 7AM/2PM", func: ["Link filtrable", "Fotos + precios", "Disparo 7AM/2PM", "Cierra venta"], color: "#1ECB6A" },
];

const EXTRAS = [
  { id: "fotos", name: "Fotos y Variantes", price: 30000, desc: "Fotos HD + variantes color/talla", func: ["Fotos HD", "Variantes", "Galería"] },
  { id: "barras", name: "Códigos de Barras", price: 35000, desc: "Pistola, etiquetas, scan", func: ["Scan pistola", "Etiquetas", "Código interno"] },
  { id: "sucursales", name: "Sucursales B1/B2", price: 60000, desc: "Multi-bodega con transfer", func: ["Crear B2", "Transfer B1→B2", "Stock por bodega"] },
  { id: "crm", name: "CRM Avanzado", price: 45000, desc: "Tags, campañas WA, ranking", func: ["Tags cliente", "Campañas WA", "Ranking compra"] },
  { id: "ecommerce", name: "E-commerce Pro", price: 70000, desc: "Link stockos.com/inv con filtros", func: ["Filtro mayor/detal", "Filtro pago", "Link personalizado"] },
  { id: "usuarios", name: "Usuarios y Roles", price: 40000, desc: "Vendedores, permisos, caja por usuario", func: ["Vendedores", "Permisos", "Caja por usuario"] },
  { id: "api", name: "API Shopify / Woo", price: 80000, desc: "Sync stock y pedidos", func: ["Sync stock", "Sync pedidos", "Webhook"] },
];

export default function PageV16OriginalConLogoYFuncionesCorregidas() {
  const [form, setForm] = useState({ empresa: "MAXIMA IMPORTADORES", nit: "900123456", email: "maxima@test.com", wa: "3044019899" });
  const [selected, setSelected] = useState<string[]>(["fotos", "sucursales"]);
  const [expanded, setExpanded] = useState<string>("dash");
  const [funcOn, setFuncOn] = useState<Record<string, boolean>>({});
  const [generated, setGenerated] = useState("");
  const [clienteData, setClienteData] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("c");
    if (c) {
      try {
        const decoded = JSON.parse(decodeURIComponent(escape(atob(c))));
        setClienteData(decoded);
      } catch {}
    }
    const init: Record<string, boolean> = {};
    [...BASE_MODS, ...EXTRAS].forEach(m => m.func.forEach(f => init[`${m.id}::${f}`] = true));
    setFuncOn(init);
  }, []);

  const total = useMemo(() => BASE + selected.reduce((a, id) => a + (EXTRAS.find(x => x.id === id)?.price || 0), 0), [selected]);

  const handleGenerate = () => {
    if (!form.empresa || !form.email) { alert("Empresa y email obligatorios"); return; }
    const payload = { n: form.empresa, empresa: form.empresa, nit: form.nit, e: form.email, email: form.email, w: form.wa, wa: form.wa, total, mods: [...BASE_MODS.map(m=>m.id), ...selected], ts: Date.now() };
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    try {
      localStorage.setItem("stockos_last_order", JSON.stringify(payload));
      const arr = JSON.parse(localStorage.getItem("stockos_orders") || "[]");
      arr.push(payload);
      localStorage.setItem("stockos_orders", JSON.stringify(arr));
    } catch {}
    setGenerated(`${typeof window !== "undefined" ? window.location.origin : ""}/admin?c=${b64}`);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA] text-[#0A2640] antialiased">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-black/[0.06]">
        <div className="max-w-[1120px] mx-auto px-5 md:px-6 h-[72px] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="STOCKOS" className="h-12 w-auto object-contain" style={{height:"48px"}} />
            <span className="hidden md:inline text-[10px] bg-[#0A2640]/10 px-2.5 py-1 rounded-full font-bold tracking-widest">V16 ORIGINAL CON LOGO</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[14px] font-medium">
            <a href="#como-funciona" className="hover:text-black transition">Cómo funciona</a>
            <a href="#modulos" className="hover:text-black transition">Módulos</a>
            <a href="#precios" className="hover:text-black transition">Precios</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="/admin" className="hidden md:inline-flex h-9 px-4 items-center justify-center rounded-full border border-[#0A2640] text-[13px] font-semibold hover:bg-[#0A2640] hover:text-white transition">Acceso Admin</a>
            <button onClick={() => document.getElementById("checkout")?.scrollIntoView({behavior:"smooth"})} className="h-9 px-5 bg-[#1ECB6A] text-[#0A2640] rounded-full font-bold text-[13px]">Activar $300k</button>
          </div>
        </div>
      </nav>

      {clienteData && (
        <div className="max-w-[1120px] mx-auto px-5 md:px-6 pt-6">
          <div className="bg-[#1ECB6A] text-[#0A2640] rounded-2xl p-5 flex justify-between items-center">
            <div><div className="font-extrabold text-[11px] tracking-widest">CLIENTE PRE-CREADO ?c= OK - LOGICA PRESERVADA</div><div className="font-bold text-[16px] mt-1">{clienteData.n} - {clienteData.e}</div><div className="text-[13px]">Total: ${clienteData.total?.toLocaleString("es-CO")} - Mods: {clienteData.mods?.join(", ")}</div></div>
            <div className="bg-[#0A2640] text-white px-4 py-2 rounded-full text-[11px] font-bold">LEYENDO LINK</div>
          </div>
        </div>
      )}

      <section className="max-w-[1120px] mx-auto px-5 md:px-6 pt-10 md:pt-[56px] pb-12 grid md:grid-cols-[1.05fr_0.95fr] gap-10 items-start">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1ECB6A]/10 border border-[#1ECB6A]/20 text-[11px] font-bold tracking-wide uppercase text-[#0A2640]">
            <span className="w-2 h-2 rounded-full bg-[#1ECB6A] animate-pulse"></span>Caso real: Máxima Importadores · 1.200 pares unificados
          </div>
          <h1 className="mt-6 text-[36px] md:text-[52px] leading-[0.95] tracking-[-0.03em] font-extrabold">
            De <span className="text-[#1ECB6A]">3 Excels desordenados</span> a 1 Inventario Maestro que vende solo.
            <span className="block mt-3 text-[18px] md:text-[21px] font-medium leading-[1.35] tracking-normal text-[#0A2640]/70">STOCKOS unifica proveedores A/B/C, calcula ganancia 40% mayor / 85% detal y dispara tu catálogo automático 7AM y 2PM.</span>
          </h1>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <button onClick={() => document.getElementById("modulos")?.scrollIntoView({behavior:"smooth"})} className="h-[48px] px-7 rounded-full bg-[#1ECB6A] text-[#0A2640] font-bold text-[14px] tracking-wide shadow-[0_8px_24px_rgba(30,203,106,0.35)] hover:brightness-[0.98] active:scale-[0.98] transition">VER DEMO EN 2 MIN →</button>
            <button onClick={() => document.getElementById("checkout")?.scrollIntoView({behavior:"smooth"})} className="h-[48px] px-7 rounded-full border-2 border-[#0A2640] text-[#0A2640] font-bold text-[14px] hover:bg-[#0A2640] hover:text-white transition">ACTIVAR $300.000/MES</button>
          </div>
          <div id="como-funciona" className="mt-12 grid grid-cols-3 gap-3 md:gap-4">
            <div className="rounded-2xl bg-[#F6F8FA] border border-black/5 p-4"><div className="text-[11px] font-bold tracking-widest text-[#1ECB6A]">ANTES</div><div className="mt-1 text-[14px] font-bold leading-tight">3 Excels</div><div className="text-[12px] text-[#0A2640]/60 leading-tight mt-1">A 50 pares · B 30 · C 20</div></div>
            <div className="rounded-2xl bg-[#F6F8FA] border border-black/5 p-4"><div className="text-[11px] font-bold tracking-widest text-[#1ECB6A]">CAOS</div><div className="mt-1 text-[14px] font-bold leading-tight">Pedido dividido</div><div className="text-[12px] text-[#0A2640]/60 leading-tight mt-1">Cliente pide 6 (3A+2B+1C)</div></div>
            <div className="rounded-2xl bg-[#F6F8FA] border border-black/5 p-4"><div className="text-[11px] font-bold tracking-widest text-[#1ECB6A]">AHORA</div><div className="mt-1 text-[14px] font-bold leading-tight">1 Inventario</div><div className="text-[12px] text-[#0A2640]/60 leading-tight mt-1">B1 unificada + link maestro</div></div>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-[28px] border border-black/5 bg-white shadow-[0_20px_60px_rgba(10,38,64,0.12)] overflow-hidden">
            <div className="h-11 px-5 flex items-center justify-between bg-[#0A2640] text-white">
              <div className="flex items-center gap-2"><img src={LOGO} alt="STOCKOS" className="h-6 w-auto brightness-0 invert" /><span className="text-[12px] font-semibold tracking-wide opacity-80">· Máxima Importadores</span></div>
              <div className="w-2 h-2 rounded-full bg-[#1ECB6A] animate-pulse"></div>
            </div>
            <div className="p-5">
              <div className="text-[12px] font-bold">DEMO REAL · Inventario B1 - 1,240 pares</div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
                <div className="bg-[#F6F8FA] border rounded-lg p-2">REF 101 Negro 38 $85k - Stock 42</div>
                <div className="bg-[#F6F8FA] border rounded-lg p-2">REF 102 Blanco 39 $90k - Stock 18</div>
                <div className="bg-[#F6F8FA] border rounded-lg p-2">REF 103 Azul 40 $88k - Stock 5 🔴</div>
                <div className="bg-[#F6F8FA] border rounded-lg p-2">REF 104 Rojo 37 $92k - Stock 31</div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
                <div className="bg-[#0A2640] text-white rounded-xl p-3 text-center"><div className="font-bold text-[16px]">200</div>pares/día</div>
                <div className="bg-[#1ECB6A]/15 border border-[#1ECB6A]/20 rounded-xl p-3 text-center"><div className="font-bold text-[16px]">$12.5M</div>ventas hoy</div>
                <div className="bg-[#F6F8FA] border rounded-xl p-3 text-center"><div className="font-bold text-[16px]">B1→B2</div>transfer</div>
              </div>
              <div className="mt-4 flex justify-center"><img src={LOGO} alt="STOCKOS" className="h-8 w-auto opacity-80" /></div>
            </div>
          </div>
        </div>
      </section>

      <section id="modulos" className="max-w-[1120px] mx-auto px-5 md:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-end">
          <div>
            <h2 className="text-[28px] md:text-[32px] font-extrabold tracking-[-0.02em] leading-tight">Lo que incluye tu base $300.000<br/>8 módulos verdes · Funciones por mundo</h2>
            <p className="mt-2 text-[14px] text-[#0A2640]/60 max-w-[520px]">Mismo diseño gráfico V16 que me mandaste con logo STOCKOS. Corregido: sin Taller Marcial, sin duplicados. Cada mundo desplegable con funciones clicables ON/OFF para que Bolt pueda seguir corrigiendo por mundo sin dañar diseño.</p>
          </div>
          <div className="text-[11px] font-bold tracking-widest opacity-40">8 VERDES · 7 EXTRAS · POR MUNDO</div>
        </div>

        <div className="mt-8">
          <div className="text-[11px] font-bold tracking-widest opacity-40 mb-3">BASE 8 - SIEMPRE ON - INCLUIDO $300K - CADA MUNDO CON FUNCIONES</div>
          <div className="grid md:grid-cols-2 gap-3">
            {BASE_MODS.map(m => {
              const isOpen = expanded === m.id;
              return (
                <div key={m.id} className={`bg-white border rounded-2xl overflow-hidden transition ${isOpen ? 'border-[#1ECB6A] shadow-[0_8px_24px_rgba(30,203,106,0.15)]' : 'border-black/5'}`}>
                  <div className="p-4 flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <div className="w-8 h-8 bg-[#1ECB6A] rounded-full flex items-center justify-center font-extrabold text-[12px] text-[#0A2640]">✓</div>
                      <div><div className="font-bold text-[14px]">{m.name}</div><div className="text-[12px] opacity-60">{m.desc}</div></div>
                    </div>
                    <button onClick={() => setExpanded(isOpen ? "" : m.id)} className="text-[11px] font-bold border rounded-full px-3 py-1.5 bg-white hover:bg-[#F6F8FA] transition">{isOpen ? "− Cerrar mundo" : "+ Mundo: Funciones"}</button>
                  </div>
                  {isOpen && (
                    <div className="px-4 pb-4 grid grid-cols-2 gap-2 border-t border-black/5 pt-3">
                      {m.func.map(fn => {
                        const k = `${m.id}::${fn}`;
                        const on = funcOn[k] ?? true;
                        return <button key={fn} onClick={() => setFuncOn(p => ({ ...p, [k]: !p[k]}))} className={`text-left text-[11px] font-bold p-2.5 rounded-xl border transition ${on ? 'bg-[#1ECB6A] border-[#1ECB6A] text-[#0A2640]' : 'bg-[#F6F8FA] border-black/5 opacity-60'}`}>{fn} {on ? "✅" : "⬜"}</button>;
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-[11px] font-bold tracking-widest opacity-40 mb-3">EXTRAS 7 - SE PRE-SELECCIONAN SEGÚN LO QUE PAGÓ EL CLIENTE - CADA MUNDO CON FUNCIONES - PARA BOLT</div>
          <div className="grid md:grid-cols-2 gap-3">
            {EXTRAS.map(ex => {
              const isOpen = expanded === ex.id;
              const sel = selected.includes(ex.id);
              return (
                <div key={ex.id} className={`bg-white border-2 rounded-2xl overflow-hidden transition ${sel ? 'border-[#1ECB6A] bg-[#1ECB6A]/5' : 'border-black/5'}`}>
                  <div className="p-4 flex justify-between items-center">
                    <label className="flex gap-3 items-center cursor-pointer flex-1">
                      <input type="checkbox" checked={sel} onChange={() => setSelected(s => s.includes(ex.id) ? s.filter(x => x !== ex.id) : [...s, ex.id])} className="w-5 h-5" />
                      <div><div className="font-bold text-[14px]">{ex.name} <span className="text-[#1ECB6A]">+${ex.price.toLocaleString("es-CO")}</span></div><div className="text-[12px] opacity-60">{ex.desc}</div></div>
                    </label>
                    <button onClick={() => setExpanded(isOpen ? "" : ex.id)} className="text-[11px] font-bold border rounded-full px-3 py-1.5 ml-3 bg-white">{isOpen ? "− Cerrar mundo" : "+ Mundo: Funciones"}</button>
                  </div>
                  {isOpen && (
                    <div className="px-4 pb-4 grid grid-cols-3 gap-2 border-t border-black/5 pt-3">
                      {ex.func.map(fn => {
                        const k = `${ex.id}::${fn}`;
                        const on = funcOn[k] ?? sel;
                        return <button key={fn} onClick={() => setFuncOn(p => ({ ...p, [k]: !p[k]}))} className={`text-[11px] font-bold p-2 rounded-xl border text-left transition ${on ? 'bg-[#0A2640] text-white border-[#0A2640]' : 'bg-white border-black/10'}`}>{fn} {on ? "✅" : "⬜"}</button>;
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="checkout" className="max-w-[1120px] mx-auto px-5 md:px-6 py-12">
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-6">
          <div className="bg-white rounded-[28px] border border-black/5 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6"><img src={LOGO} alt="STOCKOS" className="h-10 w-auto" /><h3 className="text-[26px] font-extrabold tracking-[-0.02em]">Compra en línea</h3></div>
            <p className="text-[13px] opacity-60">Mismo diseño gráfico V16 con logo. Cliente ingresa datos, selecciona extras y paga. Se guarda en localStorage y genera link /admin?c= con módulos pre-seleccionados. Listo para que Bolt continúe corrigiendo por mundo sin dañar diseño.</p>
            <div className="mt-6 grid gap-3">
              <input value={form.empresa} onChange={e => setForm({ ...form, empresa: e.target.value })} placeholder="Empresa: MAXIMA IMPORTADORES" className="h-[52px] border border-black/10 rounded-xl px-4 font-bold text-[14px] bg-[#F6F8FA] focus:bg-white focus:border-[#0A2640] outline-none" />
              <div className="grid grid-cols-2 gap-3">
                <input value={form.nit} onChange={e => setForm({ ...form, nit: e.target.value })} placeholder="NIT" className="h-[52px] border border-black/10 rounded-xl px-4 text-[14px] bg-[#F6F8FA] focus:bg-white outline-none" />
                <input value={form.wa} onChange={e => setForm({ ...form, wa: e.target.value })} placeholder="WhatsApp 3044019899" className="h-[52px] border border-black/10 rounded-xl px-4 text-[14px] bg-[#F6F8FA] focus:bg-white outline-none" />
              </div>
              <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email admin@maxima.com" className="h-[52px] border border-black/10 rounded-xl px-4 text-[14px] bg-[#F6F8FA] focus:bg-white outline-none" />
            </div>

            <div className="mt-8 flex justify-between items-center bg-[#0A2640] text-white rounded-2xl p-5">
              <div><div className="text-[11px] opacity-70 tracking-widest">TOTAL A PAGAR</div><div className="text-[28px] font-extrabold">${total.toLocaleString("es-CO")}</div><div className="text-[11px] opacity-70">Base $300k + {selected.length} extras ({selected.join(", ")})</div></div>
              <button onClick={handleGenerate} className="h-[48px] px-6 bg-[#1ECB6A] text-[#0A2640] rounded-full font-extrabold text-[14px] hover:brightness-95 transition">Crear empresa y generar link ?c=</button>
            </div>

            {generated && (
              <div className="mt-6 bg-[#1ECB6A]/10 border border-[#1ECB6A]/20 rounded-2xl p-4">
                <div className="font-bold text-[12px]">✅ LINK GENERADO - DISEÑO V16 CON LOGO PRESERVADO - LISTO PARA BOLT</div>
                <div className="mt-2 text-[10px] break-all bg-white border border-black/5 p-3 rounded-xl font-mono">{generated}</div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => navigator.clipboard.writeText(generated)} className="flex-1 h-10 bg-[#0A2640] text-white rounded-full font-bold text-[12px]">Copiar link</button>
                  <a href={generated} className="flex-1 h-10 bg-[#1ECB6A] text-[#0A2640] rounded-full font-bold text-[12px] flex items-center justify-center">Ir a /admin →</a>
                </div>
              </div>
            )}

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="border-2 border-[#1ECB6A] rounded-2xl p-4"><div className="text-[10px] font-bold tracking-widest">NEQUI</div><div className="font-mono font-bold text-[16px] mt-1">321 598 1307</div><div className="text-[11px] opacity-60">Andrés Castillo</div></div>
              <div className="border-2 border-[#0A2640] rounded-2xl p-4"><div className="text-[10px] font-bold tracking-widest">BANCOLOMBIA</div><div className="font-mono font-bold text-[14px] mt-1">912-510747-93</div><div className="text-[11px] opacity-60">Ahorros</div></div>
              <div className="border rounded-2xl p-4"><div className="text-[10px] font-bold tracking-widest">PAYPAL</div><div className="font-mono font-bold text-[11px] mt-1 break-all">andreskstllo@gmail.com</div></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#0A2640] text-white rounded-[28px] p-6">
              <div className="flex items-center gap-2 mb-4"><img src={LOGO} alt="STOCKOS" className="h-6 w-auto brightness-0 invert" /><h4 className="font-bold text-[16px]">Flujo para Bolt por mundo:</h4></div>
              <div className="space-y-3 text-[13px]">
                <div className="flex gap-3"><div className="w-7 h-7 bg-[#1ECB6A] rounded-full flex items-center justify-center text-[#0A2640] font-bold">1</div><div><b>Mundo Dashboard</b><br/><span className="opacity-70 text-[12px]">Ventas hoy, stock bajo, caja</span></div></div>
                <div className="flex gap-3"><div className="w-7 h-7 bg-white text-[#0A2640] rounded-full flex items-center justify-center font-bold">2</div><div><b>Mundo Inventario</b><br/><span className="opacity-70 text-[12px]">B1 unificada A/B/C, fotos, barras</span></div></div>
                <div className="flex gap-3"><div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center font-bold">3</div><div><b>Mundo POS + Link</b><br/><span className="opacity-70 text-[12px]">DIAN, ticket, link + WA 7AM/2PM</span></div></div>
                <div className="flex gap-3"><div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center font-bold">4</div><div><b>Mundos Extras</b><br/><span className="opacity-70 text-[12px]">Fotos, sucursales, CRM, etc - clic por mundo</span></div></div>
              </div>
            </div>
            <div className="bg-[#1ECB6A] rounded-[28px] p-6 text-[#0A2640] text-center">
              <div className="text-[11px] font-bold tracking-widest opacity-60">TOTAL PLAN V22 CON LOGO</div>
              <div className="text-[36px] font-extrabold">${total.toLocaleString("es-CO")}</div>
              <div className="text-[12px] opacity-70">Base $300k + {selected.length} extras - Diseño V16 preservado</div>
              <div className="mt-4 flex justify-center"><img src={LOGO} alt="STOCKOS" className="h-10 w-auto" /></div>
            </div>
          </div>
        </div>
      </section>

      <footer className="max-w-[1120px] mx-auto px-5 md:px-6 py-10 border-t border-black/5 flex justify-between items-center text-[12px] opacity-60">
        <div className="flex items-center gap-3"><img src={LOGO} alt="STOCKOS" className="h-8 w-auto" /><span>© {new Date().getFullYear()} STOCKOS · V16 con logo · 8 verdes + 7 extras · Sin Taller Marcial</span></div>
        <div>MAXIMA IMPORTADORES · Cali</div>
      </footer>
    </div>
  );
}
