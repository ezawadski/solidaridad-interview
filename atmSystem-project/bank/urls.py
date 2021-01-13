from django.urls import path

from . import views

urlpatterns = [
    # Atms
    path('api/atms', views.AtmListCreate.as_view(), name='atm_list'),
    path('api/atms/<int:pk>', views.AtmRetrieveUpdateDestroy.as_view(), name='atm_retrieve_update_destroy'),
    # Accounts
    path('api/accounts', views.AccountListCreate.as_view(), name='account_list'),
    path('api/accounts/<int:pk>', views.AccountRetrieveUpdateDestroy.as_view(), name='account_retrieve_update_destroy'),
    # Transactions
    path('api/accounts/<int:account_id>/transactions', views.TransactionList.as_view(), name='transaction_list'),
]
