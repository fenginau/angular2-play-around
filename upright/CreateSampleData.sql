declare @i int = 1


while @i < 40 begin
	
	INSERT INTO UR_COMPANY (COMPANY_NAME,COMPANY_ADDRESS,COMPANY_EMAIL,COMPANY_PHONE1,COMPANY_PHONE2,COMPANY_ABN,COMPANY_ACN) values ('c' + cast(@i as nvarchar(10)), 'add' + cast(@i as nvarchar(10)), cast(@i as nvarchar(10)) + '@' + cast(@i as nvarchar(10)) + '.com', cast(@i as nvarchar(10)) + '' + cast(@i as nvarchar(10)), cast(@i as nvarchar(10)) + '' + cast(@i as nvarchar(10)) + '' + cast(@i as nvarchar(10)), cast(@i as nvarchar(10)) + '' + cast(@i as nvarchar(10)), cast(@i as nvarchar(10)) + '' + cast(@i as nvarchar(10)) + '' + cast(@i as nvarchar(10)))
	set @i = @i + 1
end



