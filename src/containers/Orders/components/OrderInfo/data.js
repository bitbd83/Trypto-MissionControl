export const data ={
  "id": "7f6cbb5c-94f5-4426-aebb-0c4ac8f9715a",
  "orderCode": "Order-78745",
  "status": {
    "key": 1,
    "value": "In Process"
  },
  "currency": {
    "code": "USD",
    "symbol": "$",
    "name": "US Dollar"
  },
  "timeZone": {
    "id": "Pacific Standard Time",
    "baseUtcOffset": "-08:00:00",
    "daylightName": "Pacific Daylight Time",
    "displayName": "(UTC-08:00) Pacific Time (US & Canada)",
    "standardName": "Pacific Standard Time",
    "supportsDaylightSavingTime": true
  },
  "billingInfo": {
    "email": "amarwadi+5@gmail.com",
    "phoneNumber": {
      "number": "699-999-0000"
    },
    "name": {
      "firstName": "Anup",
      "middleName": "",
      "lastName": "Marwadi"
    },
    "address": {
      "addressLine1": "4th Ave",
      "addressLine2": "1",
      "stateProvince": "CA",
      "cityLocality": "San Diego",
      "postalCode": "92103",
      "countryCode": "US"
    }
  },
  "shippingInfo": {
    "name": {
      "firstName": "Anup",
      "middleName": "",
      "lastName": "Marwadi"
    },
    "address": {
      "addressLine1": "4th Ave",
      "addressLine2": "1",
      "stateProvince": "CA",
      "cityLocality": "San Diego",
      "postalCode": "92103",
      "countryCode": "US"
    },
    "phoneNumber": {
      "number": "451-569-8745"
    }
  },
  "orderSummary": {
    "grandTotal": 123,
    "shippingTotal": 4,
    "checkoutTotal": 104,
    "totalFees": 5,
    "totalTaxes": 10,
    "totalDiscounts": 5
  },
  "lineItems": [
    {
      "id": "kuir90nuor38003fdfbh",
      "itemType": "Ticket",
      "eventId": "kfk9o054jmsl30jf",
      "ticketTypeId": "kfk9o054jmsl30jf",
      "barcode": "kfk9o054jmsl30jf",
      "occurrence": "2018-08-07T08:51:58.735Z",
      "originalUnitPrice": 10,
      "paidUnitPrice": 3,
      "totalDiscount": 3,
      "totalFees": 4,
      "grandTotal": 88,
      "taxableAmount": 100,
      "fees": [
        {
          "feeId": "dsfhnbnyu65",
          "title": "Transaction Fee",
          "amount": 50
        }
      ],
      "taxes": [
        {
          "taxRateId": "dsfhnbnyu65",
          "title": "Special Tax with Fan Card",
          "amount": 20
        }
      ],
      "deliveryCosts": [
        {
          "deliveryId": "dsfhnbnyu65",
          "name": "DeliveryCost",
          "cost":10
        }
      ]
    }
  ],
  "orderTransactions": [
    {
      "id": "string",
      "orderId": "string",
      "amount": 0,
      "authorizationTransactionCode": "string",
      "authorizationTransactionId": "string",
      "base64EncodedReceiptSignature": "string",
      "captureTransactionId": "string",
      "customReceiptText": "string",
      "notes": "string",
      "title": "string",
      "paymentMethod": "Cash",
      "paymentGatewayType": "Unknown",
      "paymentProcessorCustomerId": "string",
      "transactionStatus": "Pending",
      "refunds": [
        {
          "id": "string",
          "refundCode": "string",
          "orderId": "string",
          "orderCode": "string",
          "amountBeforeRefund": 0,
          "refundAmount": 0,
          "transactionId": "string",
          "transactionCode": "string",
          "datePurchasedUtc": "2018-08-07T08:51:58.735Z",
          "dateCancelledUtc": "2018-08-07T08:51:58.735Z",
          "notes": "string",
          "refundedTicketIds": [
            "string"
          ],
          "refundType": "Order"
        }
      ],
      "customValues": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    }
  ],
  "datePurchasedUtc": "2018-08-07T08:51:58.735Z",
  "dateValidUntilUtc": "2018-08-07T08:51:58.735Z",
  "dateCancelledUtc": "2018-08-07T08:51:58.735Z",
  "dateModifiedUtc": "2018-08-07T08:51:58.735Z",
  "dateCreatedUtc": "2018-08-07T08:51:58.735Z",
  "events": [
    {
      "id": "string",
      "title": "string",
      "urlSlug": "string",
      "subTitle": "string",
      "heroImage": "string",
      "eventDuration": {
        "from": "2018-08-07T08:51:58.735Z",
        "to": "2018-08-07T08:51:58.735Z"
      },
      "salesDuration": {
        "from": "2018-08-07T08:51:58.735Z",
        "to": "2018-08-07T08:51:58.735Z"
      },
      "isFeatured": true,
      "onSale": true,
      "hidden": true,
      "currency": {
        "code": "string",
        "symbol": "string",
        "name": "string"
      },
      "displayOrder": 0,
      "active": true,
      "dateDeactivatedUtc": "2018-08-07T08:51:58.735Z",
      "isArchived": true,
      "dateArchivedUtc": "2018-08-07T08:51:58.735Z",
      "eventSeoSettings": {
        "pageSeoSettings": {
          "seoTitle": "string",
          "metaDescription": "string"
        },
        "facebookShareSettings": {
          "imageId": "string",
          "title": "string",
          "description": "string"
        },
        "twitterShareSettings": {
          "imageId": "string",
          "title": "string",
          "description": "string"
        }
      },
      "featureList": {
        "ticketSales": true,
        "hotelRoomInventory": true,
        "sponsorOffers": true,
        "crowdFundedEvent": true
      },
      "saleDetails": {
        "onSale": true,
        "featured": true,
        "saleText": "string"
      },
      "photos": [
        {
          "mediaId": "string",
          "caption": "string",
          "altText": "string",
          "height": 0,
          "width": 0,
          "imageUrl": "string",
          "primary": true
        }
      ],
      "venue": {
        "id": "string",
        "name": "string",
        "subTitle": "string",
        "description": "string",
        "address": {
          "addressLine1": "string",
          "addressLine2": "string",
          "addressLine3": "string",
          "stateProvince": "string",
          "cityLocality": "string",
          "postalCode": "string",
          "countryCode": "string",
          "geoCoordinates": {
            "latitude": 0,
            "longitude": 0
          }
        },
        "isArchived": true,
        "dateArchivedUtc": "2018-08-07T08:51:58.735Z",
        "dateCreatedUtc": "2018-08-07T08:51:58.735Z",
        "dateModifiedUtc": "2018-08-07T08:51:58.735Z"
      },
      "ticketTypes": [
        {
          "id": "dfgfg5547565",
          "name": "string",
          "parentTicketTypeId": "string",
          "subTitle": "string",
          "description": "string",
          "price": 0,
          "style": "Paid",
          "limitsPerOrder": {
            "from": 0,
            "to": 0
          },
          "selectionInterval": 0,
          "advancedOptions": {
            "allowWaitList": true,
            "blockPromoCodes": true
          },
          "barcodeOptions": {
            "useGlobalSettings": true,
            "barcodeSourceId": "string"
          },
          "inventoryOptions": {
            "optionType": "Unlimited",
            "inventory": {
              "id": "string",
              "inventoryType": "GaInventory",
              "name": "string",
              "quota": 0,
              "sectionKey": "string",
              "dateCreatedUtc": "2018-08-07T08:51:58.735Z",
              "dateModifiedUtc": "2018-08-07T08:51:58.735Z"
            },
            "stockSettings": {
              "lowStockThreshold": 0,
              "lowStockText": "string",
              "soldOutText": "string",
              "hideWhenOutOfStock": true,
              "displayOption": "AlwaysShow"
            }
          },
          "printOptions": {
            "allowETickets": true,
            "alternateBocaTicketTitle": true
          },
          "fees": [
            {
              "id": "string",
              "name": "string",
              "displayName": "string",
              "compound": true,
              "feeCriteria": {
                "strategy": {
                  "amount": 0,
                  "factor": "Percentage"
                },
                "minAmount": 0,
                "maxAmount": 0,
                "compound": true
              },
              "priority": 0,
              "isArchived": true,
              "dateArchivedUtc": "2018-08-07T08:51:58.735Z",
              "active": true,
              "dateDeactivatedUtc": "2018-08-07T08:51:58.735Z",
              "dateCreatedUtc": "2018-08-07T08:51:58.735Z",
              "dateModifiedUtc": "2018-08-07T08:51:58.735Z"
            }
          ],
          "taxGroups": [
            {
              "id": "string",
              "name": "string",
              "active": true,
              "dateDeactivatedUtc": "2018-08-07T08:51:58.735Z",
              "isArchived": true,
              "dateArchivedUtc": "2018-08-07T08:51:58.735Z",
              "dateCreatedUtc": "2018-08-07T08:51:58.735Z",
              "dateModifiedUtc": "2018-08-07T08:51:58.735Z",
              "taxRates": [
                {
                  "id": "string",
                  "name": "string",
                  "displayName": "string",
                  "priority": 0,
                  "compound": true,
                  "applicableOnShipping": true,
                  "countryCode": "string",
                  "stateProvinceDetails": "string",
                  "postalCodeDetails": "string",
                  "cityDetails": "string",
                  "rate": {
                    "value": 0
                  },
                  "active": true,
                  "dateDeactivatedUtc": "2018-08-07T08:51:58.735Z",
                  "isArchived": true,
                  "dateArchivedUtc": "2018-08-07T08:51:58.735Z",
                  "dateCreatedUtc": "2018-08-07T08:51:58.735Z",
                  "dateModifiedUtc": "2018-08-07T08:51:58.735Z"
                }
              ]
            }
          ],
          "deliveryOptions": [
            {
              "id": "string",
              "name": "string",
              "displayName": "string",
              "deliveryMethod": "Electronic",
              "zonePricings": [
                {
                  "id": "string",
                  "name": "string",
                  "displayName": "string",
                  "quantityCriteria": {
                    "rates": [
                      {
                        "upperLimit": 0,
                        "shippingCharge": 0
                      }
                    ]
                  },
                  "weightCriteria": {
                    "rates": [
                      {
                        "weightUpperLimit": 0,
                        "shippingCharge": 0
                      }
                    ]
                  },
                  "saleAmountCriteria": {
                    "rates": [
                      {
                        "priceUpperLimit": 0,
                        "shippingCharge": 0
                      }
                    ],
                    "defaultRate": 0
                  },
                  "shippingZone": {
                    "id": "string",
                    "name": "string",
                    "isArchived": true,
                    "dateArchivedUtc": "2018-08-07T08:51:58.735Z",
                    "regions": {
                      "countries": [
                        {
                          "countryCode": "string",
                          "states": [
                            {
                              "stateProvinceCode": "string",
                              "cities": [
                                "string"
                              ],
                              "assignedPostalCodes": {
                                "postalCodes": [
                                  "string"
                                ]
                              }
                            }
                          ]
                        }
                      ]
                    }
                  },
                  "dateCreatedUtc": "2018-08-07T08:51:58.735Z",
                  "dateModifiedUtc": "2018-08-07T08:51:58.735Z"
                }
              ],
              "dateCreatedUtc": "2018-08-07T08:51:58.735Z",
              "dateModifiedUtc": "2018-08-07T08:51:58.735Z"
            }
          ],
          "crossSells": {
            "ticketTypes": [
              {
                "id": "string",
                "name": "string",
                "parentTicketTypeId": "string",
                "subTitle": "string",
                "description": "string",
                "price": 0,
                "style": "Paid",
                "limitsPerOrder": {
                  "from": 0,
                  "to": 0
                },
                "selectionInterval": 0,
                "inventoryOptions": {
                  "optionType": "Unlimited",
                  "inventory": {
                    "id": "string",
                    "inventoryType": "GaInventory",
                    "name": "string",
                    "quota": 0,
                    "sectionKey": "string",
                    "dateCreatedUtc": "2018-08-07T08:51:58.735Z",
                    "dateModifiedUtc": "2018-08-07T08:51:58.735Z"
                  },
                  "stockSettings": {
                    "lowStockThreshold": 0,
                    "lowStockText": "string",
                    "soldOutText": "string",
                    "hideWhenOutOfStock": true,
                    "displayOption": "AlwaysShow"
                  }
                },
                "active": true,
                "isArchived": true,
                "dateDeactivatedUtc": "2018-08-07T08:51:58.735Z",
                "dateArchivedUtc": "2018-08-07T08:51:58.735Z"
              }
            ]
          },
          "upsells": {
            "ticketTypes": [
              {
                "id": "string",
                "name": "string",
                "parentTicketTypeId": "string",
                "subTitle": "string",
                "description": "string",
                "price": 0,
                "style": "Paid",
                "limitsPerOrder": {
                  "from": 0,
                  "to": 0
                },
                "selectionInterval": 0,
                "inventoryOptions": {
                  "optionType": "Unlimited",
                  "inventory": {
                    "id": "string",
                    "inventoryType": "GaInventory",
                    "name": "string",
                    "quota": 0,
                    "sectionKey": "string",
                    "dateCreatedUtc": "2018-08-07T08:51:58.735Z",
                    "dateModifiedUtc": "2018-08-07T08:51:58.735Z"
                  },
                  "stockSettings": {
                    "lowStockThreshold": 0,
                    "lowStockText": "string",
                    "soldOutText": "string",
                    "hideWhenOutOfStock": true,
                    "displayOption": "AlwaysShow"
                  }
                },
                "active": true,
                "isArchived": true,
                "dateDeactivatedUtc": "2018-08-07T08:51:58.735Z",
                "dateArchivedUtc": "2018-08-07T08:51:58.735Z"
              }
            ]
          },
          "photos": [
            {
              "mediaId": "string",
              "caption": "string",
              "altText": "string",
              "height": 0,
              "width": 0,
              "imageUrl": "string",
              "primary": true
            }
          ],
          "onSale": true,
          "hidden": true,
          "isArchived": true,
          "dateArchivedUtc": "2018-08-07T08:51:58.735Z",
          "dateCreatedUtc": "2018-08-07T08:51:58.735Z",
          "dateModifiedUtc": "2018-08-07T08:51:58.735Z"
        }
      ],
      "hotelInventory": [
        "string"
      ]
    }
  ]
}
