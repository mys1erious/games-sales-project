import requests
import pandas as pd
import json

# global_dict = {"samples": []}
# with open('data_sample.json', 'r') as f:
#     data = json.load(f)
#
#     for ind in data['Name']:
#         cur_item = \
#             {
#                 "game": {
#                     "name": data['Name'][ind],
#                     "platform": data['Platform'][ind],
#                     "publisher": data['Publisher'][ind],
#                     "developer": data['Developer'][ind],
#                     "genre": data['Genre'][ind],
#                     "year_of_release": data['Year_of_Release'][ind],
#                     "esrb_rating": data['Rating'][ind],
#                     "rating": {
#                         "critic_score": data['Critic_Score'][ind],
#                         "critic_count": data['Critic_Count'][ind],
#                         "user_score": data['User_Score'][ind],
#                         "user_count": data['User_Count'][ind],
#                     }
#                 },
#                 "NA_sales": data['NA_Sales'][ind],
#                 "EU_sales": data['EU_Sales'][ind],
#                 "JP_sales": data['JP_Sales'][ind],
#                 "other_sales": data['Other_Sales'][ind],
#                 "global_sales": data['Global_Sales'][ind],
#             }
#         global_dict['samples'].append(cur_item)
#
#
# with open('data_sample_processed.json', 'w') as outf:
#     json.dump(global_dict, outf, indent=4)
#


URL = "http://localhost:8000/api/v1/sales/"
FILE_PATH = 'data_sample_processed.json'
EMAIL = 'admin@gmail.com'
PASSWORD = 'admin'


def sales_post_request(data):
    r_post = requests.post(
        url=URL,
        data=json.dumps(data, indent=2),
        auth=(EMAIL, PASSWORD),
        headers={
            'Content-Type': 'application/json'
        }
    )
    return r_post.json()


def sales_get_request():
    r_get = requests.get(url=URL, auth=(EMAIL, PASSWORD))
    return r_get.json()


if __name__ == '__main__':
    with open(FILE_PATH, 'r') as f:
        data = json.load(f)
        samples = data['samples']

        # for i in range(8):
        #     r = sales_post_request(samples[i])
        #     print(r)

        response = sales_get_request()

        for obj in response:
            print(json.dumps(obj, indent=2))
        print(len(response))
